# Playwright running on using Azure Function Consumption plan

PoC for running Playwright in Azure Functions Consumption plan.

## Prerequisities

* Create Azure Function in Azure, using node.js runtime.
* Add setting `PLAYWRIGHT_BROWSERS_PATH` with value `/home/site/wwwroot/node_modules/playwright-chromium/.local-browsers/` in the Azure Function App

## Deploy

Deploy Azure function app by running
```
func azure functionapp publish <FUNCTION_APP_NAME> -b remote
```

## Note

Please note that `node_modules`, or at least all playwright packages needs to be added to `.funcignore`. Otherwise correct browser binaries will not be installed on the Azure Function when deploying.

## References

* [Ceruleoscope](https://github.com/microsoft/Ceruleoscope)