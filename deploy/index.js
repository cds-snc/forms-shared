"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cdk = require("@aws-cdk/core");
const ec2 = require("@aws-cdk/aws-ec2");
const rds = require("@aws-cdk/aws-rds");
const ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
const ecs = require("@aws-cdk/aws-ecs");
const path = require("path");
const DB_PORT = Number(process.env["DB_PORT"]);
const DB_NAME = process.env["DB_NAME"];
const DB_USER = process.env["DB_USER"];
const DB_PASSWORD = process.env["DB_PASSWORD"];
const DB_HOST = process.env["DB_HOST"];
const AUTH_KEY = process.env["AUTH_KEY"];
const SECURE_AUTH_KEY = process.env["SECURE_AUTH_KEY"];
const LOGGED_IN_KEY = process.env["LOGGED_IN_KEY"];
const NONCE_KEY = process.env["NONCE_KEY"];
const AUTH_SALT = process.env["AUTH_SALT"];
const SECURE_AUTH_SALT = process.env["SECURE_AUTH_SALT"];
const LOGGED_IN_SALT = process.env["LOGGED_IN_SALT"];
const NONCE_SALT = process.env["NONCE_SALT"];
class WordpressStack extends cdk.Stack {
    constructor(construct, id, props) {
        super(construct, id, props);
        // const image = ecs.ContainerImage.fromRegistry("wordpress");
        const image = ecs.ContainerImage.fromAsset(path.resolve(__dirname, "../"), {
            file: "Dockerfile",
            buildArgs: {},
        });
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
            instanceClass: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.SMALL),
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
        const wordpressService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "wordpress-service", {
            cluster: cluster,
            cpu: 256,
            desiredCount: 1,
            taskImageOptions: {
                image: image,
                environment: {
                    DB_HOST: DB_HOST,
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
                    NONCE_SALT: NONCE_SALT
                },
                enableLogging: true,
            },
            memoryLimitMiB: 512,
            publicLoadBalancer: true,
        });
        wordpressService.service.connections.allowTo(wordpressSg, ec2.Port.tcp(DB_PORT));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMzQixxQ0FBcUM7QUFDckMsd0NBQXdDO0FBQ3hDLHdDQUF3QztBQUN4QywwREFBMEQ7QUFDMUQsd0NBQXdDO0FBRXhDLDZCQUE2QjtBQUU3QixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBVyxDQUFDO0FBQ3pELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFXLENBQUM7QUFDakQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQVcsQ0FBQztBQUNqRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBVyxDQUFDO0FBQ3pELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFXLENBQUM7QUFFakQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQVcsQ0FBQztBQUNuRCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFXLENBQUM7QUFDakUsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQVcsQ0FBQztBQUM3RCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBVyxDQUFDO0FBQ3JELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFXLENBQUM7QUFDckQsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFXLENBQUM7QUFDbkUsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFB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STthQUNwQjtZQUNELGNBQWMsRUFBRSxHQUFHO1lBQ25CLGtCQUFrQixFQUFFLElBQUk7U0FDekIsQ0FDRixDQUFDO1FBRUYsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQzFDLFdBQVcsRUFDWCxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FDdEIsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUNELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLElBQUksY0FBYyxDQUFDLEdBQUcsRUFBRSxjQUFjLEVBQUU7SUFDdEMsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztRQUNuQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVO0tBQy9CO0lBQ0QsV0FBVyxFQUFFLDhCQUE4QjtDQUM1QyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKFwiZG90ZW52XCIpLmNvbmZpZygpO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgKiBhcyBlYzIgZnJvbSBcIkBhd3MtY2RrL2F3cy1lYzJcIjtcbmltcG9ydCAqIGFzIHJkcyBmcm9tIFwiQGF3cy1jZGsvYXdzLXJkc1wiO1xuaW1wb3J0ICogYXMgZWNzX3BhdHRlcm5zIGZyb20gXCJAYXdzLWNkay9hd3MtZWNzLXBhdHRlcm5zXCI7XG5pbXBvcnQgKiBhcyBlY3MgZnJvbSBcIkBhd3MtY2RrL2F3cy1lY3NcIjtcblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3QgREJfUE9SVCA9IE51bWJlcihwcm9jZXNzLmVudltcIkRCX1BPUlRcIl0pIGFzIG51bWJlcjtcbmNvbnN0IERCX05BTUUgPSBwcm9jZXNzLmVudltcIkRCX05BTUVcIl0gYXMgc3RyaW5nO1xuY29uc3QgREJfVVNFUiA9IHByb2Nlc3MuZW52W1wiREJfVVNFUlwiXSBhcyBzdHJpbmc7XG5jb25zdCBEQl9QQVNTV09SRCA9IHByb2Nlc3MuZW52W1wiREJfUEFTU1dPUkRcIl0gYXMgc3RyaW5nO1xuY29uc3QgREJfSE9TVCA9IHByb2Nlc3MuZW52W1wiREJfSE9TVFwiXSBhcyBzdHJpbmc7XG5cbmNvbnN0IEFVVEhfS0VZID0gcHJvY2Vzcy5lbnZbXCJBVVRIX0tFWVwiXSBhcyBzdHJpbmc7XG5jb25zdCBTRUNVUkVfQVVUSF9LRVkgPSBwcm9jZXNzLmVudltcIlNFQ1VSRV9BVVRIX0tFWVwiXSBhcyBzdHJpbmc7XG5jb25zdCBMT0dHRURfSU5fS0VZID0gcHJvY2Vzcy5lbnZbXCJMT0dHRURfSU5fS0VZXCJdIGFzIHN0cmluZztcbmNvbnN0IE5PTkNFX0tFWSA9IHByb2Nlc3MuZW52W1wiTk9OQ0VfS0VZXCJdIGFzIHN0cmluZztcbmNvbnN0IEFVVEhfU0FMVCA9IHByb2Nlc3MuZW52W1wiQVVUSF9TQUxUXCJdIGFzIHN0cmluZztcbmNvbnN0IFNFQ1VSRV9BVVRIX1NBTFQgPSBwcm9jZXNzLmVudltcIlNFQ1VSRV9BVVRIX1NBTFRcIl0gYXMgc3RyaW5nO1xuY29uc3QgTE9HR0VEX0lOX1NBTFQgPSBwcm9jZXNzLmVudltcIkxPR0dFRF9JTl9TQUxUXCJdIGFzIHN0cmluZztcbmNvbnN0IE5PTkNFX1NBTFQgPSBwcm9jZXNzLmVudltcIk5PTkNFX1NBTFRcIl0gYXMgc3RyaW5nO1xuXG5jbGFzcyBXb3JkcHJlc3NTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKGNvbnN0cnVjdDogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKGNvbnN0cnVjdCwgaWQsIHByb3BzKTtcblxuICAgIC8vIGNvbnN0IGltYWdlID0gZWNzLkNvbnRhaW5lckltYWdlLmZyb21SZWdpc3RyeShcIndvcmRwcmVzc1wiKTtcbiAgICBcbiAgICBjb25zdCBpbWFnZSA9IGVjcy5Db250YWluZXJJbWFnZS5mcm9tQXNzZXQocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9cIiksIHtcbiAgICAgIGZpbGU6IFwiRG9ja2VyZmlsZVwiLFxuICAgICAgYnVpbGRBcmdzOiB7fSxcbiAgICB9KTtcbiAgICBcblxuICAgIGNvbnN0IHZwYyA9IG5ldyBlYzIuVnBjKHRoaXMsIFwidnBjXCIsIHtcbiAgICAgIG1heEF6czogMixcbiAgICB9KTtcblxuICAgIGNvbnN0IHdvcmRwcmVzc1NnID0gbmV3IGVjMi5TZWN1cml0eUdyb3VwKHRoaXMsIFwid3Atc2dcIiwge1xuICAgICAgdnBjOiB2cGMsXG4gICAgICBkZXNjcmlwdGlvbjogXCJXb3JkcHJlc3Mgc2VjdXJpdHkgZ3JvdXBcIixcbiAgICB9KTtcblxuICAgIG5ldyByZHMuRGF0YWJhc2VJbnN0YW5jZSh0aGlzLCBcImRiXCIsIHtcbiAgICAgIGVuZ2luZTogcmRzLkRhdGFiYXNlSW5zdGFuY2VFbmdpbmUuTVlTUUwsXG4gICAgICBtYXN0ZXJVc2VybmFtZTogREJfVVNFUixcbiAgICAgIG1hc3RlclVzZXJQYXNzd29yZDogY2RrLlNlY3JldFZhbHVlLnBsYWluVGV4dChEQl9QQVNTV09SRCksXG4gICAgICBpbnN0YW5jZUNsYXNzOiBlYzIuSW5zdGFuY2VUeXBlLm9mKFxuICAgICAgICBlYzIuSW5zdGFuY2VDbGFzcy5UMixcbiAgICAgICAgZWMyLkluc3RhbmNlU2l6ZS5TTUFMTFxuICAgICAgKSxcbiAgICAgIHN0b3JhZ2VFbmNyeXB0ZWQ6IGZhbHNlLFxuICAgICAgbXVsdGlBejogZmFsc2UsXG4gICAgICBhdXRvTWlub3JWZXJzaW9uVXBncmFkZTogZmFsc2UsXG4gICAgICBhbGxvY2F0ZWRTdG9yYWdlOiAyNSxcbiAgICAgIHN0b3JhZ2VUeXBlOiByZHMuU3RvcmFnZVR5cGUuR1AyLFxuICAgICAgYmFja3VwUmV0ZW50aW9uOiBjZGsuRHVyYXRpb24uZGF5cygzKSxcbiAgICAgIGRlbGV0aW9uUHJvdGVjdGlvbjogZmFsc2UsXG4gICAgICBkYXRhYmFzZU5hbWU6IERCX05BTUUsXG4gICAgICB2cGMsXG4gICAgICBzZWN1cml0eUdyb3VwczogW3dvcmRwcmVzc1NnXSxcbiAgICAgIHBvcnQ6IDMzMDYsXG4gICAgfSk7XG5cbiAgICBjb25zdCBjbHVzdGVyID0gbmV3IGVjcy5DbHVzdGVyKHRoaXMsIFwiZWNzLWNsdXN0ZXJcIiwge1xuICAgICAgdnBjLFxuICAgIH0pO1xuXG4gICAgY2x1c3Rlci5jb25uZWN0aW9ucy5hZGRTZWN1cml0eUdyb3VwKHdvcmRwcmVzc1NnKTtcblxuICAgIGNvbnN0IHdvcmRwcmVzc1NlcnZpY2UgPSBuZXcgZWNzX3BhdHRlcm5zLkFwcGxpY2F0aW9uTG9hZEJhbGFuY2VkRmFyZ2F0ZVNlcnZpY2UoXG4gICAgICB0aGlzLFxuICAgICAgXCJ3b3JkcHJlc3Mtc2VydmljZVwiLFxuICAgICAge1xuICAgICAgICBjbHVzdGVyOiBjbHVzdGVyLCAvLyBSZXF1aXJlZFxuICAgICAgICBjcHU6IDI1NiwgLy8gRGVmYXVsdCBpcyAyNTZcbiAgICAgICAgZGVzaXJlZENvdW50OiAxLCAvLyBEZWZhdWx0IGlzIDEsXG4gICAgICAgIHRhc2tJbWFnZU9wdGlvbnM6IHtcbiAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICAgIERCX0hPU1Q6IERCX0hPU1QsIC8vIGRiLmRiSW5zdGFuY2VFbmRwb2ludEFkZHJlc3MsXG4gICAgICAgICAgICBEQl9VU0VSOiBEQl9VU0VSLFxuICAgICAgICAgICAgREJfUEFTU1dPUkQ6IERCX1BBU1NXT1JELFxuICAgICAgICAgICAgREJfTkFNRTogREJfTkFNRSxcbiAgICAgICAgICAgIEFVVEhfS0VZOiBBVVRIX0tFWSxcbiAgICAgICAgICAgIFNFQ1VSRV9BVVRIX0tFWTogU0VDVVJFX0FVVEhfS0VZLFxuICAgICAgICAgICAgTE9HR0VEX0lOX0tFWTogTE9HR0VEX0lOX0tFWSxcbiAgICAgICAgICAgIE5PTkNFX0tFWTogTk9OQ0VfS0VZLFxuICAgICAgICAgICAgQVVUSF9TQUxUOiBBVVRIX1NBTFQsXG4gICAgICAgICAgICBTRUNVUkVfQVVUSF9TQUxUOiBTRUNVUkVfQVVUSF9TQUxULFxuICAgICAgICAgICAgTE9HR0VEX0lOX1NBTFQ6IExPR0dFRF9JTl9TQUxULFxuICAgICAgICAgICAgTk9OQ0VfU0FMVDogTk9OQ0VfU0FMVFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZW5hYmxlTG9nZ2luZzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgbWVtb3J5TGltaXRNaUI6IDUxMiwgLy8gRGVmYXVsdCBpcyA1MTJcbiAgICAgICAgcHVibGljTG9hZEJhbGFuY2VyOiB0cnVlLCAvLyBEZWZhdWx0IGlzIGZhbHNlLFxuICAgICAgfVxuICAgICk7XG5cbiAgICB3b3JkcHJlc3NTZXJ2aWNlLnNlcnZpY2UuY29ubmVjdGlvbnMuYWxsb3dUbyhcbiAgICAgIHdvcmRwcmVzc1NnLFxuICAgICAgZWMyLlBvcnQudGNwKERCX1BPUlQpXG4gICAgKTtcbiAgfVxufVxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbm5ldyBXb3JkcHJlc3NTdGFjayhhcHAsIFwiRm9ybXNTdGFja1dQXCIsIHtcbiAgZW52OiB7XG4gICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuQVdTX0FDQ09VTlRfSUQsXG4gICAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OLFxuICB9LFxuICBkZXNjcmlwdGlvbjogXCJGYXJnYXRlIFdvcmRQcmVzcyBkZXBsb3ltZW50XCIsXG59KTtcbiJdfQ==