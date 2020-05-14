require("dotenv").config();
import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as rds from "@aws-cdk/aws-rds";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import * as ecs from "@aws-cdk/aws-ecs";

import * as path from "path";

const DB_PORT = Number(process.env["DB_PORT"]) as number;
const DB_NAME = process.env["DB_NAME"] as string;
const DB_USER = process.env["DB_USER"] as string;
const DB_PASSWORD = process.env["DB_PASSWORD"] as string;
const DB_HOST = process.env["DB_HOST"] as string;

const AUTH_KEY = process.env["AUTH_KEY"] as string;
const SECURE_AUTH_KEY = process.env["SECURE_AUTH_KEY"] as string;
const LOGGED_IN_KEY = process.env["LOGGED_IN_KEY"] as string;
const NONCE_KEY = process.env["NONCE_KEY"] as string;
const AUTH_SALT = process.env["AUTH_SALT"] as string;
const SECURE_AUTH_SALT = process.env["SECURE_AUTH_SALT"] as string;
const LOGGED_IN_SALT = process.env["LOGGED_IN_SALT"] as string;
const NONCE_SALT = process.env["NONCE_SALT"] as string;

class WordpressStack extends cdk.Stack {
  constructor(construct: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(construct, id, props);

    // const image = ecs.ContainerImage.fromRegistry("wordpress");

    const image = ecs.ContainerImage.fromAsset(path.join(__dirname, "../"));

    const vpc = new ec2.Vpc(this, "vpc", {
      maxAzs: 2,
    });

    const wordpressSg = new ec2.SecurityGroup(this, "wp-sg", {
      vpc: vpc,
      description: "Wordpress security group",
    });

    new rds.DatabaseInstance(this, "db", {
      engine: rds.DatabaseInstanceEngine.MYSQL,
      masterUsername: DB_USER,
      masterUserPassword: cdk.SecretValue.plainText(DB_PASSWORD),
      instanceClass: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.SMALL
      ),
      storageEncrypted: false,
      multiAz: false,
      autoMinorVersionUpgrade: false,
      allocatedStorage: 25,
      storageType: rds.StorageType.GP2,
      backupRetention: cdk.Duration.days(3),
      deletionProtection: false,
      databaseName: DB_NAME,
      vpc,
      securityGroups: [wordpressSg],
      port: 3306,
    });

    const cluster = new ecs.Cluster(this, "ecs-cluster", {
      vpc,
    });

    cluster.connections.addSecurityGroup(wordpressSg);

    const wordpressService = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "wordpress-service",
      {
        cluster: cluster, // Required
        cpu: 256, // Default is 256
        desiredCount: 1, // Default is 1,
        taskImageOptions: {
          image: image,
          environment: {
            DB_HOST: DB_HOST, // db.dbInstanceEndpointAddress,
            DB_USER: DB_USER,
            DB_PASSWORD: DB_PASSWORD,
            DB_NAME: DB_NAME,
            AUTH_KEY: AUTH_KEY,
            SECURE_AUTH_KEY: SECURE_AUTH_KEY,
            LOGGED_IN_KEY: LOGGED_IN_KEY,
            NONCE_KEY: NONCE_KEY,
            AUTH_SALT: AUTH_SALT,
            SECURE_AUTH_SALT: SECURE_AUTH_SALT,
            LOGGED_IN_SALT: LOGGED_IN_SALT,
            NONCE_SALT: NONCE_SALT,
          },
          enableLogging: true,
        },
        memoryLimitMiB: 512, // Default is 512
        publicLoadBalancer: true, // Default is false,
      }
    );

    wordpressService.service.connections.allowTo(
      wordpressSg,
      ec2.Port.tcp(DB_PORT)
    );
  }
}
const app = new cdk.App();
new WordpressStack(app, "FormsStackWP", {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION,
  },
  description: "Fargate WordPress deployment",
});
