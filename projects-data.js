const PROJECTS_DATA = [
  {
    id: "project-cloud-task-manager",
    title: "Cloud Task Manager",
    category: "Cloud Containers & CI/CD",
    subtitle: "Built and containerized a Flask task manager with Docker, deployed on AWS ECS Fargate, with automated GitHub Actions CI/CD via GitHub OIDC.",
    shortDescription: "Built and containerized a Flask-based task management application using Docker, deployed to AWS ECS Fargate via Amazon ECR, with automated GitHub Actions CI/CD using GitHub OIDC and AWS IAM.",
    fullDescription: "A containerized, cloud-native task management application designed for production reliability. Built with Python Flask and SQLite, containerized using Docker, and deployed on serverless container infrastructure using AWS ECS Fargate and Amazon ECR. The project features a fully automated continuous integration and continuous deployment (CI/CD) pipeline implemented with GitHub Actions. By leveraging GitHub OIDC federation with AWS IAM, deployments are executed without stored static access keys, automatically building Docker images, pushing to ECR, and initiating rolling deployments to ECS on every push to main.",
    highlights: [
      "Built and containerized a Flask-based task management application using Docker, with SQLite for persistent data storage.",
      "Deployed on AWS ECS Fargate using Amazon ECR, VPC networking, and Security Groups for controlled network access.",
      "Implemented a GitHub Actions CI/CD pipeline with GitHub OIDC and AWS IAM, automating Docker image builds, ECR pushes, and ECS deployments on every push to main.",
      "Secured cloud delivery by eliminating static AWS credentials in GitHub Secrets, adopting short-lived STS tokens through OpenID Connect (OIDC) identity provider federation."
    ],
    techStack: [
      "AWS ECS Fargate",
      "Amazon ECR",
      "Docker",
      "GitHub Actions",
      "CI/CD Pipelines",
      "GitHub OIDC",
      "AWS IAM",
      "Python Flask",
      "SQLite",
      "AWS VPC & Security Groups"
    ],
    icon: "container",
    pdfUrl: "reports/cloud-task-manager.pdf",
    documentation: {
      overview: "Built, containerized, and deployed a Python Flask task management application on AWS ECS Fargate with zero-downtime rolling updates, automated container registry workflows via Amazon ECR, and secure keyless CI/CD automation through GitHub Actions OIDC.",
      environment: [
        { label: "Cloud Platform", value: "Amazon Web Services (AWS)" },
        { label: "Container Compute", value: "AWS ECS Fargate (Serverless)" },
        { label: "Container Registry", value: "Amazon Elastic Container Registry (ECR)" },
        { label: "CI/CD Orchestration", value: "GitHub Actions Workflows" },
        { label: "Identity & Security", value: "GitHub OIDC + AWS IAM Role" },
        { label: "Application Stack", value: "Python 3.11, Flask, SQLite, Gunicorn" }
      ],
      steps: [
        "Crafted a lean, production-ready Dockerfile packaging Flask, Gunicorn, and application dependencies.",
        "Created an Amazon ECR repository with image vulnerability scanning on push and immutable tags.",
        "Configured AWS IAM Identity Provider for GitHub Actions with OpenID Connect (OIDC) and defined trust policies for main branch deployments.",
        "Built the GitHub Actions workflow (.github/workflows/deploy.yml) configuring AWS credentials via aws-actions/configure-aws-credentials.",
        "Provisioned an AWS ECS Cluster and defined a Fargate Task Definition with memory, CPU limits, log streaming to CloudWatch, and execution roles.",
        "Configured ECS Fargate Service with VPC subnets and security groups, verifying automated rolling task deployments upon git commits."
      ],
      results: [
        { test: "Docker Containerization", outcome: "Application packaged into lightweight container image with clean dependency isolation", status: "Pass" },
        { test: "GitHub OIDC Authentication", outcome: "GitHub Actions assumes AWS IAM role securely without long-lived secret keys", status: "Pass" },
        { test: "ECR Image Push", outcome: "Automated container builds push tagged release images directly to Amazon ECR", status: "Pass" },
        { test: "ECS Fargate Rolling Deploy", outcome: "ECS service updates running tasks with zero service disruption or dropped requests", status: "Pass" }
      ]
    }
  },
  {
    id: "project-3tier-aws",
    title: "Secure 3-Tier Web Application on AWS",
    category: "Cloud Architecture & Security",
    subtitle: "Architected a secure 3-tier web app in a custom multi-AZ VPC with isolated RDS MySQL in private subnets, S3 storage, and Node.js using IAM roles.",
    shortDescription: "Architected a secure 3-tier web application in a custom VPC with public and private subnets across multiple Availability Zones, isolated Amazon RDS MySQL, and S3 integration via IAM instance profiles.",
    fullDescription: "A production-grade secure 3-tier cloud architecture deployed on Amazon Web Services (AWS). Designed with fault tolerance across multiple Availability Zones, the system partitions presentation, business logic, and persistence tiers into isolated public and private subnets. The relational database tier utilizes Amazon RDS MySQL strictly sequestered within private database subnets with inbound port 3306 restricted solely to the web application tier. Unstructured media storage is seamlessly handled by Amazon S3, integrated into a Node.js Express backend using AWS SDK v3 with temporary credentials supplied by an IAM instance profile.",
    highlights: [
      "Architected a secure 3-tier web application in a custom VPC with public and private subnets across multiple Availability Zones.",
      "Isolated the Amazon RDS MySQL database in private subnets and restricted inbound port 3306 traffic to the web tier security group only.",
      "Integrated Amazon S3 storage with a Node.js and Express backend using AWS SDK v3, replacing static access keys with an IAM instance profile.",
      "Enforced least-privilege security policies across route tables, Network ACLs, and AWS Security Groups to prevent unauthorized lateral movement."
    ],
    techStack: [
      "AWS VPC",
      "Amazon EC2",
      "Amazon RDS (MySQL)",
      "Amazon S3",
      "Node.js",
      "Express.js",
      "AWS SDK v3",
      "IAM Instance Profiles",
      "Security Groups",
      "Multi-AZ"
    ],
    icon: "shield-check",
    pdfUrl: "reports/3-tier-aws-web-application.pdf",
    documentation: {
      overview: "Designed, provisioned, and verified a hardened multi-tier web application infrastructure on AWS featuring multi-AZ subnet zoning, private Amazon RDS MySQL isolation, S3 object storage integration via AWS SDK v3, and IAM instance role credential-less access.",
      environment: [
        { label: "Cloud Platform", value: "Amazon Web Services (AWS - Multi-AZ)" },
        { label: "Compute Tier", value: "Amazon EC2 (Node.js & Express Application)" },
        { label: "Database Tier", value: "Amazon RDS MySQL (Private DB Subnet Group)" },
        { label: "Storage Tier", value: "Amazon S3 (Blocked Public Access)" },
        { label: "Networking", value: "Custom VPC (10.0.0.0/16) across 2 AZs" },
        { label: "Authentication", value: "EC2 IAM Instance Profile (No Static Keys)" }
      ],
      steps: [
        "Created a custom AWS VPC (10.0.0.0/16) with 2 public subnets and 2 private subnets distributed across multiple Availability Zones.",
        "Attached an Internet Gateway for public subnets and structured isolated route tables for private database tiers.",
        "Configured multi-tier security groups: web-sg allowing HTTP/HTTPS traffic and db-sg restricting TCP port 3306 exclusively to web-sg.",
        "Provisioned an Amazon RDS MySQL database within a private DB subnet group with public accessibility disabled.",
        "Created an IAM Role with Amazon S3 read/write permissions and assigned it as an EC2 Instance Profile to the application server.",
        "Implemented backend application logic in Node.js/Express using AWS SDK v3 to stream file uploads directly to S3 and query RDS MySQL securely."
      ],
      results: [
        { test: "Database Network Isolation", outcome: "RDS MySQL is unreachable from the internet and protected in private subnets", status: "Pass" },
        { test: "Ingress Port Restriction", outcome: "MySQL port 3306 accepts incoming traffic only from instances in the web security group", status: "Pass" },
        { test: "S3 SDK v3 Integration", outcome: "Node.js backend streams uploads to S3 bucket using IAM instance profile credentials", status: "Pass" },
        { test: "High Availability & Multi-AZ", outcome: "Subnets configured across multiple AZs ensuring fault-tolerant cloud architecture", status: "Pass" }
      ]
    }
  },
  {
    id: "project-multi-az-alb",
    title: "High-Availability Multi-AZ Web Architecture with ALB",
    category: "High Availability & Networking",
    subtitle: "Eliminated single points of failure by moving web servers behind an internet-facing Application Load Balancer across two AZs with automated User Data.",
    shortDescription: "Designed a fault-tolerant multi-AZ web architecture on AWS utilizing an internet-facing Application Load Balancer (ALB), automated Apache web servers via User Data scripts, and round-robin health-checked distribution.",
    fullDescription: "A resilient, fault-tolerant web server architecture deployed on Amazon Web Services (AWS) to eliminate single points of failure. The architecture transitions a vulnerable single-server workload into a distributed multi-Availability Zone topology fronted by an internet-facing Application Load Balancer (ALB). Multiple Linux EC2 web servers are deployed across separate Availability Zones, with bootstrap installation and web service configuration fully automated using EC2 User Data bash scripts. Features continuous Target Group health monitoring and round-robin traffic routing.",
    highlights: [
      "Removed single points of failure by moving a single-server setup behind an internet-facing Application Load Balancer.",
      "Deployed Linux EC2 web servers across two Availability Zones, automating Apache installation with User Data scripts.",
      "Configured Target Group health checks and verified round-robin traffic distribution across healthy instances.",
      "Implemented decoupled security group layers ensuring backend EC2 instances accept HTTP traffic exclusively from the ALB."
    ],
    techStack: [
      "AWS ALB",
      "Amazon EC2",
      "Application Load Balancer",
      "Target Groups",
      "Apache HTTP Server",
      "Linux",
      "User Data Scripts",
      "Multi-AZ Architecture",
      "AWS VPC"
    ],
    icon: "network",
    pdfUrl: "reports/high-availability-multi-az-alb.pdf",
    documentation: {
      overview: "Transformed a standalone server setup into a fault-tolerant, high-availability multi-AZ deployment on AWS utilizing an internet-facing Application Load Balancer, automated User Data provisioning, and automated target group health probing.",
      environment: [
        { label: "Cloud Platform", value: "Amazon Web Services (AWS)" },
        { label: "Load Balancer", value: "Internet-Facing Application Load Balancer (ALB)" },
        { label: "Compute Tier", value: "Linux EC2 Instances across 2 Availability Zones" },
        { label: "Web Server", value: "Apache HTTP Server (httpd)" },
        { label: "Automation", value: "EC2 User Data Bash Scripts" },
        { label: "Routing Strategy", value: "Target Group with Round-Robin & Health Checks" }
      ],
      steps: [
        "Configured a multi-AZ VPC topology with public subnets spanning Availability Zones us-east-1a and us-east-1b.",
        "Created an ALB Security Group accepting public HTTP traffic on port 80 and an EC2 Security Group restricting inbound port 80 to the ALB Security Group.",
        "Authored an EC2 User Data bash script automating system updates, Apache httpd installation, service startup, and generating dynamic server identification pages.",
        "Launched EC2 Linux web server instances in both Availability Zones with the automated User Data script.",
        "Configured an ALB Target Group with HTTP health check parameters (path: '/', interval: 30s, healthy threshold: 2).",
        "Provisioned the Application Load Balancer, mapped public subnets, attached listeners, and verified active round-robin routing across healthy targets."
      ],
      results: [
        { test: "Automated User Data Bootstrapping", outcome: "Apache HTTP server installs and starts automatically on EC2 launch without manual intervention", status: "Pass" },
        { test: "Round-Robin Traffic Balancing", outcome: "Consecutive HTTP requests distribute evenly across healthy instances in both AZs", status: "Pass" },
        { test: "Target Group Health Monitoring", outcome: "ALB regularly probes target endpoints and routes traffic solely to healthy instances", status: "Pass" },
        { test: "Fault Tolerance Validation", outcome: "Architecture retains high availability when an instance or AZ experiences failure", status: "Pass" }
      ]
    }
  }
];
