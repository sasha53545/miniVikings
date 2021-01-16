const {Router} = require('express');
const router = Router();
const {AWS_POOL_CLIENT_ID, AWS_POOL_ID, AWS_REGION} = require('./../config');

router.get(
    '/aws-config',
    [],
    async (request, response) => {
        const awsConfig = {
            "aws_project_region": AWS_REGION,
            "aws_cognito_region": AWS_REGION,
            "aws_user_pools_id": AWS_POOL_ID,
            "aws_user_pools_web_client_id": AWS_POOL_CLIENT_ID,
            "oauth": {}
        };

        response.send(awsConfig);
    }
);

module.exports = router;
