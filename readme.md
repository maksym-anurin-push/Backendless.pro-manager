# Welcome to Backendless Pro

Backendless Pro is a uniquely tailored version of the widely recognized Backendless Platform, designed to meet diverse deployment needs. This special package offers the flexibility to be installed in various environments. Whether it's for individual developers or large-scale enterprise operations, Backendless Pro adapts seamlessly to different requirements.

## Get Started (MacOS)

Prerequisites:

- macOS 15.7.9+
- [Node Version Manager](https://github.com/nvm-sh/nvm)
- [OrbStack](https://orbstack.dev)

```shell
# Use amd64 version of NodeJS
arch -x86_64 zsh --login -c 'nvm install v22.22.3 --arch=x64 && nvm alias v22-x64 v22.22.3'

# Cleanup pre
orb delete k8s --force; \
sleep 10; \
rm -r k8s-mount; \
rm -r db; \
orb restart k8s; \
sleep 30

# Deploy minimal dependencies and start Backendless management(installation) service
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/cloud/deploy.yaml; \
sleep 5; \
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml; \
sleep 5; \
arch -x86_64 zsh --login -c 'nvm use v22-x64 && npm start'

# Open dashboard in a browser
open http://localhost:5050
```

## Where Can Backendless Pro Run?

Backendless Pro's adaptability is one of its core strengths. It can be set up in various scenarios, each offering its own advantages:

### Developer Machines

For individual developers or small teams, Backendless Pro can be installed directly on personal computers. This setup is ideal for development, testing, and small-scale applications. It allows developers to work locally, ensuring a controlled and convenient environment for coding and experimentation.

### Public Cloud Installations

Leverage the scalability and reliability of public clouds like AWS, Azure, or Digital Ocean. Backendless Pro integrates smoothly with these services, providing a robust platform for your applications. This option is perfect for businesses looking to scale their operations without worrying about infrastructure management.

### Private Cloud Environments

For organizations prioritizing privacy and control, Backendless Pro can be deployed in private cloud infrastructures. This ensures data security and compliance with internal policies and regulations. Deploying in a private cloud environment allows for tailored security measures and greater control over data handling.

For detailed information about installation and configuration, please visit the **[Backendless Pro Documentation](https://backendless.com/docs/pro/index.html)**.