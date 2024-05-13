FROM debian:bullseye

ENV enclave_platform="aws-nitro"

# install build-essential, openjdk, maven, git
RUN apt-get update -y \
    && apt-get install -y curl -y build-essential pkg-config libssl-dev cmake openjdk-11-jdk maven git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# build vsockpx
RUN git clone https://github.com/IABTechLab/uid2-aws-enclave-vsockproxy.git \
    && mkdir uid2-aws-enclave-vsockproxy/build \
    && (cd uid2-aws-enclave-vsockproxy/build; cmake .. -DCMAKE_BUILD_TYPE=RelWithDebInfo; make; cd ../..) \
    && cp uid2-aws-enclave-vsockproxy/build/vsock-bridge/src/vsock-bridge ./vsockpx

COPY ./vsock_config_validator.yaml ./vsock_config_validator.yaml
CMD ["./vsockpx", "--config", "vsock_config_validator.yaml"]

