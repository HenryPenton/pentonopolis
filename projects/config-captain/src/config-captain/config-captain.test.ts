import {
  Configuration,
  DuplicateConfigKeyError,
  EnvironmentVariableUndefinedError
} from "./config-captain";

describe("config captain", () => {
  describe("non critical environment variables", () => {
    test("returns an environment map of one variable", () => {
      const dataSource = { "some-variable": "some-value" };

      const configuration = new Configuration(
        {
          someVariable: "some-variable"
        },
        {},
        [dataSource]
      );
      const environmentVars = configuration.getConfigurationVariables();

      const expectedEnvironmentVariables = {
        someVariable: "some-value"
      };

      expect(environmentVars).toEqual(expectedEnvironmentVariables);
    });

    test("returns an environment map of one variable from second data source", () => {
      const dataSource = { "some-variable": "some-value" };
      const dataSourceTwo = { "some-variable-two": "some-value-two" };

      const configuration = new Configuration(
        {
          someVariable: "some-variable",
          someVariableTwo: "some-variable-two"
        },
        {},
        [dataSource, dataSourceTwo]
      );
      const environmentVars = configuration.getConfigurationVariables();

      const expectedEnvironmentVariables = {
        someVariable: "some-value",
        someVariableTwo: "some-value-two"
      };

      expect(environmentVars).toEqual(expectedEnvironmentVariables);
    });

    test("returns an environment map of multiple environment variables", () => {
      const dataSource = {
        "some-variable": "some-value",
        "some-other-variable": "some-other-value"
      };

      const configuration = new Configuration(
        {
          someVariable: "some-variable",
          someOtherVariable: "some-other-variable"
        },
        {},
        [dataSource]
      );
      const environmentVars = configuration.getConfigurationVariables();

      const expectedEnvironmentVariables = {
        someVariable: "some-value",
        someOtherVariable: "some-other-value"
      };

      expect(environmentVars).toEqual(expectedEnvironmentVariables);
    });
  });

  describe("critical environment variables", () => {
    test("critical environment variable throws if it's not defined", () => {
      expect(
        () =>
          new Configuration(
            {},
            {
              someUndefinedVariable: "some-undefined-variable"
            },
            [{}]
          )
      ).toThrow(
        new EnvironmentVariableUndefinedError(
          "The environment variable some-undefined-variable was undefined"
        )
      );
    });

    test("two critical environment variables throw if they're not defined", () => {
      expect(
        () =>
          new Configuration(
            {},
            {
              someUndefinedVariable: "some-undefined-variable",
              someOtherUndefinedVariable: "some-other-undefined-variable"
            },
            [{}]
          )
      ).toThrow(
        new EnvironmentVariableUndefinedError(
          "The environment variables some-undefined-variable and some-other-undefined-variable were undefined"
        )
      );
    });

    test("three critical environment variables throw if they're not defined", () => {
      expect(
        () =>
          new Configuration(
            {},
            {
              someUndefinedVariable: "some-undefined-variable",
              someOtherUndefinedVariable: "some-other-undefined-variable",

              someFinalUndefinedVariable: "some-final-undefined-variable"
            },
            [{}]
          )
      ).toThrow(
        new EnvironmentVariableUndefinedError(
          "The environment variables some-undefined-variable, some-other-undefined-variable and some-final-undefined-variable were undefined"
        )
      );
    });

    test("gets a critical environment variable", () => {
      const dataSource = {
        "some-critical-variable": "some-value"
      };
      const config = new Configuration(
        {},
        { someMustHaveVariable: "some-critical-variable" },
        [dataSource]
      );

      const expectedEnvironmentVariables = {
        someMustHaveVariable: "some-value"
      };

      expect(config.getConfigurationVariables()).toEqual(
        expectedEnvironmentVariables
      );
    });

    test("gets a critical environment variable from the second data source", () => {
      const dataSourceOne = {
        "some-critical-variable": "some-value"
      };

      const dataSourceTwo = {
        "some-other-critical-variable": "some-value"
      };
      const config = new Configuration(
        {},
        {
          someMustHaveVariable: "some-critical-variable",
          someOtherMustHaveVariable: "some-other-critical-variable"
        },
        [dataSourceOne, dataSourceTwo]
      );

      const expectedEnvironmentVariables = {
        someMustHaveVariable: "some-value",
        someOtherMustHaveVariable: "some-value"
      };

      expect(config.getConfigurationVariables()).toEqual(
        expectedEnvironmentVariables
      );
    });

    test("gets multiple critical environment variables", () => {
      const dataSource = {
        "some-must-have-variable": "some-value",
        "some-other-must-have-variable": "some-other-value"
      };
      const config = new Configuration(
        {},
        {
          someMustHaveVariable: "some-must-have-variable",
          someOtherMustHaveVariable: "some-other-must-have-variable"
        },
        [dataSource]
      );

      const expectedEnvironmentVariables = {
        someMustHaveVariable: "some-value",
        someOtherMustHaveVariable: "some-other-value"
      };

      expect(config.getConfigurationVariables()).toEqual(
        expectedEnvironmentVariables
      );
    });
  });

  describe("getConfigurationVariable", () => {
    test("get single environment variable", () => {
      const dataSource = {
        "some-critical-variable": "some-critical-value"
      };
      const config = new Configuration(
        {},
        { someMustHaveVariable: "some-critical-variable" },
        [dataSource]
      );

      const criticalVariable = config.getConfigurationVariable(
        "someMustHaveVariable"
      );
      expect(criticalVariable).toBe("some-critical-value");
    });
  });

  describe("getConfigurationVariableOrUndefined", () => {
    test("getConfigurationVariableOrUndefined that exists", () => {
      const dataSource = {
        "some-non-critical-variable": "some-non-critical-value"
      };
      const config = new Configuration(
        { someCanHaveVariable: "some-non-critical-variable" },
        {},
        [dataSource]
      );

      const nonCriticalVariable = config.getConfigurationVariableOrUndefined(
        "someCanHaveVariable"
      );
      expect(nonCriticalVariable).toBe("some-non-critical-value");
    });

    test("getConfigurationVariableOrUndefined that doesn't exist", () => {
      const config = new Configuration(
        { someCanHaveVariable: "some-non-critical-variable" },
        {},
        [{}]
      );

      const nonCriticalVariable = config.getConfigurationVariableOrUndefined(
        "someCanHaveVariable"
      );
      expect(nonCriticalVariable).toBeUndefined();
    });
  });

  describe("duplicates", () => {
    test("throws duplicate error if multiple things are defined with the same value", () => {
      const dataSource = {
        "some-non-critical-variable": "some-non-critical-value",
        "some-name-two": "some-critical-value"
      };

      expect(
        () =>
          new Configuration(
            { variableName: "some-name-one" },
            { variableName: "some-name-two" },
            [dataSource]
          )
      ).toThrow(
        new DuplicateConfigKeyError(
          "Two or more variables have been defined with the same name."
        )
      );
    });
  });

  describe("prioritisation", () => {
    test("prioritises the first data source", () => {
      const dataSourceOne = {
        "some-variable-name": "the-value-I-want-to-have-priority"
      };

      const dataSourceTwo = {
        "some-variable-name": "some-other-value"
      };

      const config = new Configuration(
        {},
        {
          variableName: "some-variable-name"
        },
        [dataSourceOne, dataSourceTwo]
      );

      const expectedEnvironmentVariables = {
        variableName: "the-value-I-want-to-have-priority"
      };

      expect(config.getConfigurationVariables()).toEqual(
        expectedEnvironmentVariables
      );
    });
  });
});
