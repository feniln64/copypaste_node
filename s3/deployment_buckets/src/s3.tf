
resource "aws_s3_bucket" "deployment_bucket" {
  bucket = var.bucketName
  
  tags = {
    Name          = var.bucketName
    env           = var.env
    product       = "scanbuy"
    client_src    = var.clientName
    sb_managed_by = "terraform"
    app           = var.bucketName
    sb_repo       = "ops-central/s3/access_log_buckets/regions"
  }

}

resource "aws_s3_bucket_ownership_controls" "bucket_ownership" {
  bucket = aws_s3_bucket.deployment_bucket.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}


#resource "aws_s3_bucket_acl" "bucket_private_acl" {
#  bucket = aws_s3_bucket.deployment_bucket.id
#  acl    = "private"
#}

resource "aws_s3_bucket_versioning" "deployment_bucket_versioning" {
  bucket = aws_s3_bucket.deployment_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_logging" "deployment_bucket_logging" {
  bucket = aws_s3_bucket.deployment_bucket.id

  target_bucket = local.logging_bucket_id
  target_prefix = "logs/${var.bucketName}/"


}
resource "aws_s3_bucket_acl" "log_bucket_acl" {
  bucket = local.logging_bucket_id
  acl    = "log-delivery-write"
}

resource "aws_s3_bucket_policy" "deployment_bucket_policy" {
  bucket = aws_s3_bucket.deployment_bucket.id
  policy = file("${path.module}/access_policy.json")
}

#resource "aws_s3_bucket_intelligent_tiering_configuration" "deployment-entire-bucket-tiering" {
#  bucket = aws_s3_bucket.deployment_bucket.bucket
#  name   = "EntireBucket"
#
#  tiering {
#    access_tier = "DEEP_ARCHIVE_ACCESS"
#    days        = 180
#  }
#  tiering {
#    access_tier = "ARCHIVE_ACCESS"
#    days        = 125
#  }
#}

resource "aws_s3_bucket_analytics_configuration" "deployment-entire-bucket-analytics" {
  bucket = aws_s3_bucket.deployment_bucket.bucket
  name   = "EntireBucket"

  storage_class_analysis {
    deployment_export {
      destination {
        s3_bucket_destination {
          bucket_arn = local.logging_bucket_arn
          prefix = "${var.bucketName}/"
        }
      }
    }
  }
}

resource "aws_s3_bucket_public_access_block" "deployment_public_access" {
  bucket = aws_s3_bucket.deployment_bucket.id

  block_public_acls   = true
  block_public_policy = true
  restrict_public_buckets = true
  ignore_public_acls = true
}


resource "aws_s3_bucket_lifecycle_configuration" "deployment-lifecycle" {
  bucket = aws_s3_bucket.deployment_bucket.id

  rule {
    id = "delete-old-markers"

    noncurrent_version_expiration {
      noncurrent_days = 90
    }

    noncurrent_version_transition {
      noncurrent_days = 30
      storage_class   = "STANDARD_IA"
    }

    noncurrent_version_transition {
      noncurrent_days = 60
      storage_class   = "GLACIER"
    }

    expiration {
      expired_object_delete_marker = true
    }
    abort_incomplete_multipart_upload {
      days_after_initiation = 1
    }
    status = "Enabled"
  }
}