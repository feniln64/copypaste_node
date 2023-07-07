variable "bucketName" {

}

variable "env" {
  default = "prod"
}

variable "region" {
  
}

variable "access_bucket_tfstate" {
  default = "data/buckets/accesslogging.terraform.tfstate"
}