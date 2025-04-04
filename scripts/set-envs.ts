
const run = async () => {
    const environment = 'development' // TODO: Change get from command line arguments
    const appConfig = (await import(`../app.config.${environment}.json`)) as Record<string, any>;

    const string = JSON.stringify(appConfig);
    console.log(string);
}

run();