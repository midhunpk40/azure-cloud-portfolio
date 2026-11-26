window.PROJECTS_DATA = [
  {
    id: "project-azure-cloud-portfolio",
    title: "Azure Cloud Serverless Portfolio & API Platform",
    category: "Serverless & Cloud Architecture",
    featured: true,
    subtitle: "Enterprise serverless web portfolio with Azure Static Web Apps, Functions, Cosmos DB, and Application Insights.",
    shortDescription: "Architected and deployed an enterprise-grade serverless web portfolio on Microsoft Azure, featuring Azure Functions API endpoints, Cosmos DB analytics persistence, and GitHub Actions CI/CD.",
    fullDescription: "A production-grade, globally distributed serverless cloud application deployed on Microsoft Azure. Designed for high performance, enterprise security, and horizontal scalability, the architecture leverages Azure Static Web Apps for global edge content distribution, an automated CI/CD pipeline integrated with GitHub Actions, and serverless Node.js backend APIs running on Azure Functions. Visitor session telemetry is persisted in Azure Cosmos DB with sub-10ms response times, while system performance, health, and exceptions are continuously tracked through Azure Application Insights.",
    highlights: [
      "Engineered automated continuous deployment pipeline via GitHub Actions and Azure Static Web Apps with global edge CDN caching.",
      "Developed serverless REST API endpoints (/api/track, /api/stats, /api/contact) deployed on Azure Functions with managed identity.",
      "Implemented high-throughput visitor session analytics persisted in Azure Cosmos DB NoSQL with sub-10ms query response latencies.",
      "Integrated Azure Application Insights for end-to-end distributed tracing, real-time telemetry, and automated error alerting.",
      "Configured enterprise Content Security Policy (CSP), strict HTTP transport security (HSTS), and CORS security policies via staticwebapp.config.json."
    ],
    techStack: [
      "Microsoft Azure",
      "Azure Static Web Apps",
      "Azure Functions",
      "Azure Cosmos DB",
      "Application Insights",
      "Azure Communication Services",
      "GitHub Actions",
      "REST APIs",
      "Node.js",
      "CSP Security"
    ],
    icon: "cloud",
    pdfUrl: null,
    githubUrl: "https://github.com/midhunpk40/portfolio",
    liveUrl: "https://github.com/midhunpk40/portfolio",
    documentation: {
      overview: "Architected, provisioned, and deployed a globally distributed serverless cloud application on Microsoft Azure featuring Azure Static Web Apps, serverless Functions APIs, Cosmos DB NoSQL persistence, and automated GitHub Actions CI/CD.",
      environment: [
        { label: "Cloud Platform", value: "Microsoft Azure (Global Edge)" },
        { label: "Frontend Hosting", value: "Azure Static Web Apps (SWA)" },
        { label: "Serverless Compute", value: "Azure Functions (Node.js 20 LTS)" },
        { label: "Database Tier", value: "Azure Cosmos DB (Serverless NoSQL)" },
        { label: "Observability", value: "Azure Application Insights & Monitor" },
        { label: "CI/CD Pipeline", value: "GitHub Actions Workflow" }
      ],
      steps: [
        "Configured Azure Static Web Apps linked to GitHub repository with custom security headers and routing rules.",
        "Created Azure Functions HTTP triggers for visitor telemetry tracking (/api/track) and real-time counter querying (/api/stats).",
        "Provisioned Azure Cosmos DB serverless container partitioned by pageId with optimistic concurrency control.",
        "Configured Azure Application Insights SDK to capture serverless execution telemetry, cold-start latency, and API exceptions.",
        "Constructed automated GitHub Actions workflow deploying frontend assets and serverless functions on every push to main.",
        "Enforced strict Content Security Policy (CSP), Referrer-Policy, and X-Content-Type-Options via staticwebapp.config.json."
      ],
      results: [
        { test: "Global Edge Content Delivery", outcome: "Static assets served across Microsoft Azure Edge CDN with sub-50ms latency", status: "Pass" },
        { test: "Serverless API Execution", outcome: "Azure Functions processes /api/track and /api/stats with zero infrastructure overhead", status: "Pass" },
        { test: "Cosmos DB Session Ingestion", outcome: "Unique visitor sessions written to Cosmos DB container with sub-10ms response time", status: "Pass" },
        { test: "Automated GitHub Actions CI/CD", outcome: "Pushes to main automatically trigger test, build, and zero-downtime deployment", status: "Pass" }
      ]
    }
  },
  {
    id: "project-cold-chain-monitoring",
    title: "Cold-Chain Excursion Monitoring Platform",
    category: "Serverless & Event-Driven Architecture",
    featured: false,
    subtitle: "Built a serverless AWS platform using IoT Core, Lambda, and DynamoDB detecting temperature excursions and silent sensors in vaccine shipments, with Step Functions escalation, Cognito RBAC, and Terraform IaC.",
    shortDescription: "Built a serverless AWS platform using IoT Core, Lambda, and DynamoDB detecting temperature excursions and silent sensors in simulated vaccine shipments, automated alerts and escalation with EventBridge, Step Functions and SNS, secured a role-based API with Cognito, and provisioned everything with Terraform.",
    fullDescription: "A mission-critical, event-driven serverless IoT monitoring platform deployed on Amazon Web Services (AWS) to guarantee pharmaceutical integrity during vaccine cold-chain transit. The architecture ingests real-time telemetry from simulated IoT temperature and GPS sensors via AWS IoT Core, processing data with AWS Lambda microservices and persisting audit logs in Amazon DynamoDB. Using Amazon EventBridge rules and AWS Step Functions distributed state machines, the platform continuously analyzes sensor heartbeats to catch both temperature threshold excursions and silent sensor disconnects, triggering multi-tier automated alerts and escalation notifications through Amazon SNS. The application REST API is secured with Amazon Cognito User Pools implementing role-based access control (RBAC), and 100% of the AWS infrastructure is codified and provisioned using modular HashiCorp Terraform.",
    highlights: [
      "Built a serverless AWS platform using IoT Core, Lambda, and DynamoDB that detects temperature excursions and silent sensors in simulated vaccine shipments.",
      "Engineered automated anomaly detection logic in Lambda identifying threshold temperature breaches and tracking sensor heartbeat intervals to catch silent/dead devices.",
      "Automated alerting and multi-stage incident escalation workflows with Amazon EventBridge rules, AWS Step Functions state machines, and Amazon SNS notifications.",
      "Secured a role-based REST API using Amazon API Gateway and Amazon Cognito User Pools with fine-grained RBAC permissions.",
      "Provisioned 100% of the multi-service AWS cloud infrastructure as reproducible Infrastructure as Code (IaC) using Terraform."
    ],
    techStack: [
      "AWS IoT Core",
      "AWS Lambda",
      "Amazon DynamoDB",
      "Amazon EventBridge",
      "AWS Step Functions",
      "Amazon SNS",
      "Amazon Cognito",
      "Amazon API Gateway",
      "Terraform (IaC)",
      "Python 3.11",
      "MQTT Protocol"
    ],
    icon: "activity",
    pdfUrl: null,
    githubUrl: "https://github.com/midhunpk40/cold-chain",
    documentation: {
      overview: "Designed, implemented, and provisioned an event-driven serverless IoT cold-chain telemetry platform on AWS that detects temperature violations and silent sensor outages during vaccine transit, automating escalation workflows with Step Functions and provisioning entirely through Terraform.",
      environment: [
        { label: "Cloud Platform", value: "Amazon Web Services (AWS)" },
        { label: "Architecture Pattern", value: "Serverless & Event-Driven Microservices" },
        { label: "IoT Ingestion", value: "AWS IoT Core (MQTT Topic Rules)" },
        { label: "Compute & Logic", value: "AWS Lambda (Python 3.11)" },
        { label: "NoSQL Database", value: "Amazon DynamoDB (On-Demand Telemetry)" },
        { label: "Workflow Escalation", value: "Amazon EventBridge & AWS Step Functions" },
        { label: "Alert Dispatch", value: "Amazon Simple Notification Service (SNS)" },
        { label: "Identity & Auth", value: "Amazon Cognito User Pools (RBAC)" },
        { label: "Infrastructure as Code", value: "HashiCorp Terraform (Modular IaC)" }
      ],
      steps: [
        "Wrote modular Terraform code declaring IoT Core topic rules, DynamoDB tables, Lambda functions, EventBridge event buses, and Step Functions state machines.",
        "Simulated cold-chain IoT temperature and GPS sensors publishing telemetry packets over MQTT to AWS IoT Core topic endpoints.",
        "Configured IoT Core SQL rules to filter incoming sensor payloads and invoke Lambda ingestion functions with batch streaming.",
        "Persisted time-series sensor telemetry in DynamoDB with partition keys structured by shipmentId and timestamps for fast point-in-time querying.",
        "Implemented an AWS Step Functions state machine tracking sensor heartbeat intervals to catch silent or offline sensors and handle multi-stage escalation.",
        "Set up Amazon EventBridge event patterns listening for excursion events and dispatching immediate high-priority alerts via Amazon SNS.",
        "Deployed Amazon API Gateway REST endpoints authenticated with Amazon Cognito JWT authorizers, restricting escalation acknowledgments to authenticated operators."
      ],
      results: [
        { test: "IoT MQTT Ingestion", outcome: "Sensors stream telemetry payloads to AWS IoT Core with sub-50ms ingestion latency", status: "Pass" },
        { test: "Temperature Excursion Alerting", outcome: "Excursions beyond safe thresholds trigger EventBridge and SNS alert delivery within seconds", status: "Pass" },
        { test: "Silent Sensor Anomaly Tracking", outcome: "Step Functions detects missed heartbeat intervals and initiates automated timeout escalations", status: "Pass" },
        { test: "Cognito RBAC Security", outcome: "API Gateway restricts privileged operational actions to authenticated Cognito supervisor roles", status: "Pass" },
        { test: "Terraform IaC Deployment", outcome: "Entire multi-service cloud architecture deploys consistently and idempotently via Terraform", status: "Pass" }
      ]
    }
  },
  {
    id: "project-cloud-task-manager",
    title: "Cloud Task Manager",
    category: "Cloud Containers & CI/CD",
    featured: false,
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
    pdfUrl: null,
    githubUrl: "https://github.com/midhunpk40/cloud-task-manager",
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
    featured: false,
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
    githubUrl: "https://github.com/midhunpk40",
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
    featured: false,
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
    pdfUrl: null,
    githubUrl: "https://github.com/midhunpk40",
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
