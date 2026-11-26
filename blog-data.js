window.BLOG_DATA = [
  {
    id: "zero-secret-ci-cd-aws-oidc",
    title: "Zero-Secret Deployments: Implementing GitHub Actions CI/CD with AWS OIDC & IAM Roles",
    category: "DevOps & CI/CD",
    featured: true,
    date: "Nov 20, 2026",
    readTime: "6 min read",
    author: "Midhun P K",
    authorRole: "Cloud & DevOps Intern",
    excerpt: "Eliminate vulnerable long-lived AWS IAM access keys in GitHub Secrets. Learn how OpenID Connect (OIDC) identity federation enables dynamic, short-lived STS credentials for secure ECS and ECR automated deployments.",
    tags: ["AWS", "GitHub Actions", "OIDC", "IAM Roles", "CI/CD", "Docker", "ECS"],
    relatedIds: ["multi-az-3tier-architecture-aws", "serverless-azure-portfolio-platform"],
    content: `
      <h3>Introduction: The Risk of Long-Lived Cloud Credentials</h3>
      <p>In traditional CI/CD pipelines, integrating GitHub Actions with Amazon Web Services often involved creating an IAM user with programmatic access and storing static credentials (<code>AWS_ACCESS_KEY_ID</code> and <code>AWS_SECRET_ACCESS_KEY</code>) inside repository secrets. While convenient, static secrets present substantial security liabilities: they do not automatically expire, can be leaked through accidental console logs or compromised workflow runs, and require continuous manual rotation policies.</p>

      <p>OpenID Connect (OIDC) federation completely revolutionizes this paradigm. Instead of storing credentials, GitHub Actions directly authenticates with the AWS Security Token Service (STS) using cryptographic JSON Web Tokens (JWTs). AWS verifies the token signature, evaluates an IAM trust policy, and issues short-lived temporary session credentials valid only for the duration of the deployment job.</p>

      <div class="blog-callout">
        <i data-lucide="shield-check"></i>
        <div>
          <strong>Core Security Principle:</strong>
          <span>Zero static credentials stored anywhere in GitHub. Every workflow execution receives a unique, dynamically scoped temporary STS token with an automated 1-hour expiration window.</span>
        </div>
      </div>

      <h3>Architectural Workflow Blueprint</h3>
      <p>The authentication handshake between GitHub and AWS follows an automated four-stage sequence:</p>
      <ol class="blog-ordered-list">
        <li><strong>Workflow Trigger:</strong> A developer pushes code to the <code>main</code> branch, launching the GitHub Actions runner.</li>
        <li><strong>JWT Request:</strong> The runner requests an OIDC token signed by GitHub's certificate authority containing repository and branch claims.</li>
        <li><strong>STS Exchange:</strong> The action sends the JWT to AWS STS via the <code>AssumeRoleWithWebIdentity</code> API.</li>
        <li><strong>Trust Evaluation:</strong> AWS validates that the token originates from <code>token.actions.githubusercontent.com</code> and that the repository claim strictly matches <code>repo:midhunpk40/cloud-task-manager:ref:refs/heads/main</code>.</li>
      </ol>

      <h3>Step-by-Step Implementation</h3>
      <h4>1. Establishing the AWS IAM OIDC Identity Provider</h4>
      <p>First, configure the GitHub OIDC provider in your AWS account using the AWS CLI or Terraform:</p>
      <pre><code>aws iam create-open-id-connect-provider \\
  --url "https://token.actions.githubusercontent.com" \\
  --client-id-list "sts.amazonaws.com" \\
  --thumbprint-list "6938fd4d98bab03faadb97b34396831e3780aea1"</code></pre>

      <h4>2. Authoring the Least-Privilege IAM Trust Policy</h4>
      <p>Create a dedicated deployment role with a trust policy that restricts assumption to your exact repository and target branch:</p>
      <pre><code>{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:midhunpk40/cloud-task-manager:ref:refs/heads/main"
        }
      }
    }
  ]
}</code></pre>

      <h4>3. GitHub Actions Workflow Configuration</h4>
      <p>Inside your <code>.github/workflows/deploy.yml</code>, grant ID token permissions and leverage the official AWS credentials action:</p>
      <pre><code>name: Deploy to AWS ECS
on:
  push:
    branches: [ main ]

permissions:
  id-token: write   # Required for requesting the JWT
  contents: read    # Required for actions/checkout

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Configure AWS Credentials via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-actions-ecs-deploy-role
          aws-region: us-east-1

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build, Tag, and Push Docker Image
        env:
          REGISTRY: \${{ steps.login-ecr.outputs.registry }}
          REPOSITORY: cloud-task-manager
          IMAGE_TAG: \${{ github.sha }}
        run: |
          docker build -t $REGISTRY/$REPOSITORY:$IMAGE_TAG .
          docker push $REGISTRY/$REPOSITORY:$IMAGE_TAG

      - name: Deploy Task Definition to AWS ECS
        run: |
          aws ecs update-service --cluster task-cluster --service task-service --force-new-deployment</code></pre>

      <h3>Key Takeaways & Production Benefits</h3>
      <ul class="blog-checklist">
        <li><strong>No Secret Leakage Vectors:</strong> Zero static keys to revoke when offboarding engineers or rotating infrastructure.</li>
        <li><strong>Granular Subject Restriction:</strong> Pull requests and untrusted forks cannot trigger production role assumption.</li>
        <li><strong>Automated Audit Trails:</strong> CloudTrail logs every <code>AssumeRoleWithWebIdentity</code> event with the exact commit SHA and GitHub workflow job ID.</li>
      </ul>
    `
  },
  {
    id: "multi-az-3tier-architecture-aws",
    title: "Architecting Multi-AZ Resilient 3-Tier Infrastructure on AWS with Private Subnet Isolation",
    category: "Cloud Architecture",
    featured: false,
    date: "Nov 12, 2026",
    readTime: "8 min read",
    author: "Midhun P K",
    authorRole: "Cloud & DevOps Intern",
    excerpt: "Deep-dive into partitioning production web environments into segmented subnets, enforcing security group boundaries on Amazon RDS MySQL, and credential-less S3 integration via IAM Instance Profiles.",
    tags: ["AWS", "VPC", "EC2", "RDS MySQL", "S3", "Security Groups", "Multi-AZ"],
    relatedIds: ["zero-secret-ci-cd-aws-oidc", "serverless-azure-portfolio-platform"],
    content: `
      <h3>The Classical 3-Tier Enterprise Model</h3>
      <p>The 3-tier architecture remains the bedrock of dependable cloud systems. By strictly isolating the presentation tier (web server), logic tier (application backend), and persistence tier (relational database), organizations achieve fault tolerance, compartmentalized security, and independent scalability across Availability Zones.</p>

      <h3>Network Topology & Subnet Segmentation</h3>
      <p>A production VPC should span at least two Availability Zones (e.g., <code>us-east-1a</code> and <code>us-east-1b</code>) to guarantee high availability. Subnets are divided into two distinct visibility domains:</p>

      <div class="blog-spec-grid">
        <div class="blog-spec-item">
          <strong>Public Web Tier (10.0.1.0/24 & 10.0.2.0/24)</strong>
          <p>Connected to an Internet Gateway (IGW). Hosts internet-facing compute instances or Application Load Balancers accepting inbound HTTP (80) and HTTPS (443).</p>
        </div>
        <div class="blog-spec-item">
          <strong>Private Database Tier (10.0.11.0/24 & 10.0.12.0/24)</strong>
          <p>Has no route to the Internet Gateway. Allocates Amazon RDS DB Subnet Groups completely inaccessible from public DNS or external IP routing.</p>
        </div>
      </div>

      <h3>Enforcing Least-Privilege Security Group Ingress</h3>
      <p>The database tier security group (<code>db-sg</code>) should never reference an IP CIDR block for application ingress. Instead, it references the ID of the web security group (<code>web-sg</code>):</p>
      <pre><code># Example AWS CLI Security Group Rule Configuration
aws ec2 authorize-security-group-ingress \\
  --group-id sg-0dbmysqlgroup123 \\
  --protocol tcp \\
  --port 3306 \\
  --source-group sg-0webappgroup456</code></pre>
      <p>This dynamic linkage ensures that even if new EC2 compute instances are spun up within <code>web-sg</code> across Availability Zones, they automatically receive authorized connectivity to port 3306 without altering database firewall rules.</p>

      <h3>Credential-Less Object Storage with AWS SDK v3</h3>
      <p>Rather than injecting AWS access keys into <code>.env</code> files on EC2 instances, attach an IAM Role containing an Amazon S3 policy as an EC2 Instance Profile. The AWS SDK v3 automatically discovers temporary credentials from the instance metadata service (IMDSv2):</p>
      <pre><code>import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Client automatically resolves credentials via IAM Instance Profile
const s3 = new S3Client({ region: "us-east-1" });

export async function uploadMedia(fileBuffer, fileName) {
  const command = new PutObjectCommand({
    Bucket: "lab-files-midhun-2026-unique",
    Key: \`uploads/\${fileName}\`,
    Body: fileBuffer,
    ContentType: "image/jpeg"
  });

  return await s3.send(command);
}</code></pre>

      <h3>High Availability Verification & Fault Tolerance</h3>
      <p>During testing, simulated instance termination in AZ <code>us-east-1a</code> confirmed that traffic automatically routed to the remaining active AZ with zero data corruption. Amazon RDS Multi-AZ replication guaranteed automated synchronous standby failover within 60 seconds.</p>
    `
  },
  {
    id: "serverless-azure-portfolio-platform",
    title: "Building Enterprise Serverless Web Platforms with Azure Static Web Apps, Functions & Cosmos DB",
    category: "Azure & Serverless",
    featured: false,
    date: "Oct 28, 2026",
    readTime: "7 min read",
    author: "Midhun P K",
    authorRole: "Cloud & DevOps Intern",
    excerpt: "How this portfolio was engineered: leveraging Azure Static Web Apps edge CDN, serverless Node.js Functions, Cosmos DB NoSQL visitor analytics, and automated GitHub Actions deployment.",
    tags: ["Microsoft Azure", "Static Web Apps", "Azure Functions", "Cosmos DB", "Application Insights"],
    relatedIds: ["zero-secret-ci-cd-aws-oidc", "multi-az-3tier-architecture-aws"],
    content: `
      <h3>Why Serverless on Microsoft Azure?</h3>
      <p>Modern personal and enterprise web applications require near-instant global load times, zero idle hosting costs, and automated security patching. Azure Static Web Apps (SWA) combined with Azure Functions serverless compute and Azure Cosmos DB NoSQL persistence offers an unbeatable architecture for web scale.</p>

      <h3>Architecture Overview</h3>
      <p>The platform is partitioned into three decoupled serverless tiers:</p>
      <ul class="blog-checklist">
        <li><strong>Edge Presentation:</strong> Pre-rendered static assets distributed globally across Microsoft Azure's global Point of Presence (PoP) network.</li>
        <li><strong>Serverless Compute APIs:</strong> Lightweight Node.js Azure Functions triggered via HTTP requests for telemetry and form dispatching.</li>
        <li><strong>Global Persistence Layer:</strong> Azure Cosmos DB serverless account storing visitor session documents with sub-10ms point-read latencies.</li>
      </ul>

      <h3>Visitor Telemetry Pipeline & Cosmos DB Binding</h3>
      <p>When a visitor lands on the site, <code>analytics.js</code> executes a non-blocking POST request to the <code>/api/track</code> Azure Function. The function processes the request using input/output bindings:</p>
      <pre><code>const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

app.http('track', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const body = await request.json();
    const pageId = body.pageId || 'home';
    const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
    const container = client.database('PortfolioDB').container('Visits');

    await container.items.create({
      id: context.invocationId,
      pageId: pageId,
      timestamp: new Date().toISOString()
    });

    return { status: 200, jsonBody: { tracked: true } };
  }
});</code></pre>

      <h3>Security Hardening with staticwebapp.config.json</h3>
      <p>Enterprise cloud security requires defense in depth. By configuring <code>staticwebapp.config.json</code>, the site enforces strict Content Security Policies, disables frame sniffing, and denies clickjacking vectors:</p>
      <pre><code>{
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;"
  }
}</code></pre>

      <h3>Observability with Azure Application Insights</h3>
      <p>By wiring Application Insights into Azure Functions, invocation runtimes, API dependency calls to Cosmos DB, and 5xx exception alerts are streamed into a unified dashboard, enabling real-time monitoring and proactive resolution.</p>
    `
  },
  {
    id: "google-workspace-m365-migration",
    title: "Zero-Downtime Cross-Platform Cutover: Migrating Google Workspace to Microsoft 365",
    category: "Cloud Migration",
    featured: false,
    date: "Oct 15, 2026",
    readTime: "6 min read",
    author: "Midhun P K",
    authorRole: "Cloud & DevOps Intern",
    excerpt: "A structured operational guide to cross-tenant email and mailbox migration: configuring GCP service account domain-wide delegation, Exchange Admin Center batches, and DNS MX cutover.",
    tags: ["Microsoft 365", "Google Workspace", "GCP", "Email Migration", "DNS", "EAC"],
    relatedIds: ["serverless-azure-portfolio-platform", "zero-secret-ci-cd-aws-oidc"],
    content: `
      <h3>The Challenge of Enterprise Mailbox Migration</h3>
      <p>Migrating corporate mailboxes, contacts, and calendar schedules between disparate SaaS ecosystemsâ€”specifically from Google Workspace to Microsoft 365â€”demands meticulous execution. Business communication cannot tolerate downtime or lost incoming emails during the cutover window.</p>

      <h3>Pre-Migration Authentication: GCP Domain-Wide Delegation</h3>
      <p>Rather than collecting individual user passwords, enterprise migrations leverage OAuth 2.0 service accounts:</p>
      <ol class="blog-ordered-list">
        <li><strong>Google Cloud Project Setup:</strong> Create a dedicated project in Google Cloud Console and enable the Admin SDK and Gmail APIs.</li>
        <li><strong>Service Account Generation:</strong> Provision an IAM service account and generate a cryptographic P12 / JSON key credential.</li>
        <li><strong>Domain-Wide Delegation:</strong> In the Google Workspace Admin Console under Security &gt; API Controls, authorize the service account Client ID with necessary migration scopes (<code>https://mail.google.com/</code>, <code>https://www.googleapis.com/auth/admin.directory.user/</code>).</li>
      </ol>

      <h3>Exchange Admin Center (EAC) Migration Endpoint</h3>
      <p>Inside the Microsoft 365 Exchange Admin Center, configure a Google Workspace migration endpoint utilizing the service account email and P12 certificate. Construct a CSV mapping file pairing source Google addresses with target Microsoft 365 user principals:</p>
      <pre><code>EmailAddress
midhun@company.com
alex@company.com
sarah@company.com</code></pre>

      <h3>The Two-Stage Synchronization Strategy</h3>
      <p>To ensure zero downtime, migrations are executed in two distinct phases:</p>
      <div class="blog-callout">
        <i data-lucide="mail"></i>
        <div>
          <strong>Initial Sync vs. Delta Cutover:</strong>
          <span>The initial migration batch transfers 95% of historical emails and attachments while users continue working in Google Workspace. Once completed, a final delta sync copies newly arrived messages immediately prior to DNS MX record modification.</span>
        </div>
      </div>

      <h3>DNS MX Cutover & Mail Flow Switch</h3>
      <p>Lower TTL values on existing MX and SPF records 48 hours prior to cutover. During the final maintenance window, update the primary MX record to point to Microsoft 365 mail protection (e.g., <code>company-com.mail.protection.outlook.com</code>). Because both environments remain synchronized, inbound emails transition effortlessly without bouncing or message drop.</p>
    `
  }
];
