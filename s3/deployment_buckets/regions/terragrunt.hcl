# Configure Terragrunt to automatically store tfstate files in an S3 bucket.
remote_state {
  backend = "s3"
  config = {
    encrypt        = true
    bucket         = "terraform.scanbuy.ops"
    key            = "data/buckets/${path_relative_to_include()}/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "data-buckets-terragrunt-locks"
  }
}

terraform {
  extra_arguments "retry_lock" {
    commands  = get_terraform_commands_that_need_locking()
    arguments = ["-lock-timeout=20m"]
  }

  after_hook "success" {
    commands = ["apply"]
    execute = ["echo", "Changes have been applied successfully: " ]
    run_on_error = false
  }
}

locals {

}