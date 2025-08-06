# Deploy Node.js App to AWS Elastic Beanstalk with GitHub Actions

This repository demonstrates how to build a Node.js TypeScript application and deploy it to AWS Elastic Beanstalk using GitHub Actions for CI/CD automation.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [AWS Elastic Beanstalk Setup](#aws-elastic-beanstalk-setup)
- [GitHub Actions Configuration](#github-actions-configuration)
- [Deployment Process](#deployment-process)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## 🚀 Project Overview

This is a simple Express.js application built with TypeScript that includes:

- **Express.js server** with a basic "Hello World" endpoint
- **TypeScript configuration** for type safety
- **Simple testing** with Node.js built-in assert module
- **GitHub Actions CI/CD** pipeline
- **AWS Elastic Beanstalk** deployment configuration

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **AWS Account** with appropriate permissions
- **GitHub repository** for your code

### AWS Permissions Required

Your AWS user/role needs these permissions:
- `elasticbeanstalk:*`
- `s3:*` (for deployment artifacts)
- `ec2:*` (for EC2 instances)
- `iam:PassRole`
- `logs:*` (for CloudWatch logs)

## 📁 Project Structure

```
nodejs-eb-gh-app/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions workflow
├── src/
│   └── index.ts                # Main application file
├── test/
│   └── app.test.js             # Simple test file
├── dist/                       # Compiled JavaScript (generated)
├── .env                        # Environment variables (local)
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🏃‍♂️ Local Development

### 1. Clone and Install

```bash
git clone https://github.com/samowolabi/nodejs-elastic-beanstalk-with-githubactions-app.git
cd nodejs-elastic-beanstalk-with-githubactions-app
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3500
```

### 3. Development Commands

```bash
# Run in development mode with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run production build
npm start

# Run tests
npm test
```

### 4. Test Locally

Visit `http://localhost:3500` to see the "Hello, TypeScript with Express!" message.

## ☁️ AWS Elastic Beanstalk Setup

### 1. Create Elastic Beanstalk Application

```bash
# Using AWS CLI
aws elasticbeanstalk create-application \
    --application-name nodejs-app-eb-gh-app \
    --description "Node.js app with GitHub Actions deployment"
```

### 2. Create Environment

```bash
aws elasticbeanstalk create-environment \
    --application-name nodejs-app-eb-gh-app \
    --environment-name Nodejs-app-eb-gh-app-env \
    --solution-stack-name "64bit Amazon Linux 2 v5.8.0 running Node.js 18"
```

### 3. Configure Environment Variables (Optional)

Set environment variables in the AWS Console:
- Go to **Elastic Beanstalk** → **Your Environment** → **Configuration** → **Software**
- Add environment properties as needed

## 🔧 GitHub Actions Configuration

### 1. Repository Secrets

Add these secrets to your GitHub repository (**Settings** → **Secrets and variables** → **Actions**):

- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key

### 2. Workflow Configuration

The `.github/workflows/ci.yml` file contains:

#### Test Job
- Runs on Node.js 18.x and 20.x
- Installs dependencies
- Runs tests
- Builds the project

#### Deploy Job
- Runs only on `main` branch pushes
- Triggers after successful tests
- Creates deployment package
- Deploys to Elastic Beanstalk

### 3. Customize for Your Environment

Update these values in `.github/workflows/ci.yml`:

```yaml
application_name: your-app-name        # Your EB application name
environment_name: your-env-name        # Your EB environment name
region: us-east-1                      # Your AWS region
```

## 🚀 Deployment Process

### Automatic Deployment

1. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **GitHub Actions will**:
   - Run tests on multiple Node.js versions
   - Build the TypeScript project
   - Create a deployment package
   - Deploy to Elastic Beanstalk

3. **Monitor progress**:
   - Check **GitHub Actions** tab for pipeline status
   - Check **AWS Elastic Beanstalk** console for deployment status

### Manual Deployment (Alternative)

```bash
# Build the project
npm run build

# Create deployment package
zip -r deploy.zip . -x '*.git*' 'node_modules/.cache/*' 'src/*' 'test/*' '*.md' '.env*'

# Deploy using EB CLI
eb deploy
```

## 🔐 Environment Variables

### Production Environment Variables

Set these in **AWS Elastic Beanstalk Console**:

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Server port (auto-provided by EB) | `8080` |

### Local Development

Use `.env` file for local development (already in `.gitignore`):

```env
PORT=3500
NODE_ENV=development
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. Deployment Fails
- **Check AWS permissions**: Ensure your AWS credentials have necessary permissions
- **Verify application/environment names**: Must match exactly in workflow
- **Check logs**: AWS Elastic Beanstalk → Environment → Logs

#### 2. Tests Fail
- **Local testing**: Run `npm test` locally to debug
- **Dependencies**: Ensure all dependencies are in `package.json`

#### 3. Build Errors
- **TypeScript errors**: Run `npm run build` locally
- **Missing dependencies**: Check `devDependencies` section

#### 4. Environment Issues
- **Port binding**: Elastic Beanstalk provides `PORT` environment variable
- **Environment variables**: Set sensitive variables in AWS Console, not code

### Debug Commands

```bash
# Check application status
npm run build && npm start

# View AWS EB status
aws elasticbeanstalk describe-environments \
    --application-name nodejs-app-eb-gh-app

# Check GitHub Actions logs
# Go to GitHub → Actions tab → Select workflow run
```

## 📚 Learn More

- [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Express.js Guide](https://expressjs.com/en/starter/installing.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sam Owolabi** - 
[Website](https://samowolabi.com)
[GitHub Profile](https://github.com/samowolabi)
[Linkedin Profile](https://www.linkedin.com/in/sam-owolabi)

---

⭐ If this tutorial helped you, please give it a star!
