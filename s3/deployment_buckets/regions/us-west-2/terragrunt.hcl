terraform {
  source = ../../src
}
include {
  path = find_in_parent_folders()
}

inputs = {
  bucketName = 
  region =
}
