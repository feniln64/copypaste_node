#
# Our template for creating Data S3 Buckets.
#
terraform {
  # The configuration for this backend will be filled in by Terragrunt
  backend "s3" {}
}

provider "aws" {
  region = var.region
}

#
# Reference the 'access logging'
#
data "terraform_remote_state" "access_logging" {
  backend = "s3"
  config = {
    region  = "us-east-1"
    profile = ""
    bucket  = "terraform.scanbuy.ops"
    key     = var.access_bucket_tfstate
  }
}

locals  {
  logging_bucket_id  = data.terraform_remote_state.access_logging.outputs.logging_bucket_id
  logging_bucket_arn = data.terraform_remote_state.access_logging.outputs.logging_bucket_arn
}