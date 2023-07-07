variable "bucketName" {

}

variable "env" {
  default = "prod"
}

variable "region" {
  default = "us-east-1"
}

variable "access_bucket_tfstate" {
  default = "data/buckets/accesslogging.terraform.tfstate"
}