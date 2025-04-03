import { execSync } from "child_process";

const run = async () => {
    const environment = 'development' // TODO: Change get from command line arguments
    const appConfig = (await import(`../app.config.${environment}.json`)) as Record<string, any>;

    const string = JSON.stringify(appConfig);
    execSync(`echo '${string}' | firebase apphosting:secrets:set --force --data-file - appConfig-${environment}`);
}

run();