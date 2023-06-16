import boto3
import time as tm
from botocore.config import Config
from datetime import datetime
from datetime import timedelta
import os


#log_group="aws-waf-logs-cmp-legacy"
#web_acl_arn="arn:aws:wafv2:us-east-1:741839589785:regional/webacl/cmp_blacklist/e1030a52-dc05-46e0-b841-1d6d577206fd"
#region="us-east-1"
#ip_set_name="cmp_ip_blacklist"
#ip_set_id="865f4a6b-36d0-4f1b-ac5a-721db6ed2a4c"

days=int(os.environ.get("days"))
log_group=os.environ.get("log_group")
web_acl_arn=os.environ.get("web_acl_arn")
region=os.environ.get("region")
ip_set_name=os.environ.get("ip_set_name")
ip_set_id=os.environ.get("ip_set_id")


current_hits = []
ip_list = []
query_response=''

query = '''fields httpRequest.clientIp | filter action ='BLOCK'
| filter webaclId = "{resource_arn}"
| stats count(*) as requestCount by httpRequest.clientIp
| sort requestCount desc'''.format(resource_arn=web_acl_arn)

my_config = Config(
    region_name=region
)

logs_client = boto3.client('logs', config=my_config)

waf_v2_client = boto3.client('wafv2', config=my_config)

def find_32_ip(ip_list):
    list_32 = []
    for i in ip_list:
        if (i[-2:] != ".0"):
            list_32.append(i)
    return list_32

def find_current_hits(days,log_group,query,query_response):
    query_response=''
    start_time = (datetime.now() - timedelta(days=days))
    start_time = int(tm.mktime(start_time.timetuple()))

    start_query_response = logs_client.start_query(
        logGroupName=log_group,
        startTime=start_time,
        endTime=int(tm.time()),
        queryString=query,
        )
    
    query_id = start_query_response['queryId']

    while query_response == '' or query_response['status'] == 'Running':
        print('Waiting for query to complete ...')
        tm.sleep(1)
        query_response = logs_client.get_query_results(
            queryId=query_id
        )

    for i in query_response['results']:
        current_hits.append(i[0]['value'])
    
    return current_hits

def remove_ips_from_ip_set(ip_set_id,ip_set_name,current_hits):
    try:
        ip_list=[]
        # Get the current IP set
        ip_list_object = waf_v2_client.get_ip_set(
            Name=ip_set_name,
            Scope='REGIONAL',
            Id=ip_set_id
        )
        
        for i in ip_list_object['IPSet']['Addresses']:
            head, sep, tail = i.partition('/')
            ip_list.append(head)

        current_hits.sort()
        ip_list.sort()

        # Remove the specified IPs from the IP set
        # Update the IP set with the new IP list
        Updated_list = list(set(ip_list) - set(current_hits))
        print("IPs to be removed from the IP set: "+str(len(ip_list)))
        print("currrent hits count = "+str(len(current_hits)))
        print("remaining ips count = "+str(len(Updated_list)))
        
        print(Updated_list)
        final_list = []
        for i in Updated_list:
            if i[-4:] == ".0.0":
                final_list.append(i+"/16")
            elif i[-2:] == ".0":
                final_list.append(i+"/24")
            else:
                final_list.append(i+"/32")
        if len(final_list) == len(Updated_list):
            response = waf_v2_client.update_ip_set(
               Name=ip_set_name,
               Scope='REGIONAL',
               Id=ip_set_id,
                Addresses=final_list,
               LockToken=ip_list_object['LockToken'])
            print("IPs removed successfully from the IP set.")

    except waf_v2_client.exceptions.WAFOptimisticLockException as e:
        print("Error: {e}".fonmat(e=e))
        print("Optimistic locking exception. The IP set has been modified by another process. Please try again.")
    except Exception as e:
        print("Error: {e}".format(e=e))
        print("An error occurred while removing IPs from the IP set.")

current_hits = find_current_hits(days,log_group,query,query_response)
remove_ips_from_ip_set(ip_set_id,ip_set_name, current_hits)
