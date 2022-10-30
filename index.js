const errorLogger = (err) => {
  return console.error(
    `=================================================================
    ----------${err}----------
    =============================================================`
  );
};

const updateYaml = (passedConfig) => {
  import("js-yaml").then((yaml) => {
    import("fs").then((fs) => {
      const yamlConfig = yaml.load(
        fs.readFileSync(passedConfig.yamlPath || "./config.yaml")
      );
      yamlConfig[passedConfig.targetYamlKey || "schema"] =
        process.env[passedConfig.targetEnvKey || ""];
      fs.writeFile(passedConfig.yamlPath, yaml.dump(yamlConfig), (err) => {
        if (err) {
          errorLogger("Error writing yaml file");
        }
        console.log("===Yaml file updated====");
      });
    });
  });
};

const loadDotEnv = (passedConfig) => {
  import("dotenv").then((dotenv) => {
    dotenv.config({ path: passedConfig.envPath || "./env" });
    updateYaml(passedConfig);
  });
};

import("./codegen-rewrite-config.json", {
  assert: { type: "json" },
})
  .then((module) => {
    const passedConfig = module.default;
    if (
      !passedConfig &&
      passedConfig.keys(passedConfig).length === 0 &&
      passedConfig.getPrototypeOf(passedConfig) === passedConfig.prototype
    ) {
      return errorLogger("No config keys found in codegen-yaml-rewrite.json");
    }
    loadDotEnv(passedConfig);
  })
  .catch((err) => errorLogger("No config passed for codegen-yaml-rewrite"));
