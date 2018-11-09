:Deployment
echo Handling node.js deployment.

:: 0. Select node version for build
call :SelectNodeVersion

:: 1. Install build dependencies
pushd "%DEPLOYMENT_SOURCE%"
call :ExecuteCmd !NPM_CMD! install --production
IF !ERRORLEVEL! NEQ 0 goto error
popd

:: 2. Run build command
pushd "%DEPLOYMENT_SOURCE%"
call :ExecuteCmd !NPM_CMD! run-script build
IF !ERRORLEVEL! NEQ 0 goto error
popd