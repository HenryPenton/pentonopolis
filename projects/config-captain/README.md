# README

![Build](https://github.com/HenryPenton/pentonopolis/actions/workflows/CI-CD.yml/badge.svg)

Config Captain is designed to be a dependency injectable environment configuration object that can make helpful suggestions as to what configuration you have loaded.

```javascript
import { Configuration } from "config-captain";

const config = new Configuration(
  { optionalVariable: "SOME_OPTIONAL_VARIABLE" },
  { requiredVariable: "SOME_REQUIRED_VARIABLE" },
  [{ SOME_OPTIONAL_VARIABLE: "VALUE_ONE", SOME_REQUIRED_VARIABLE: "VALUE_TWO" }]
);

config.getConfigurationVariable("requiredVariable");
config.getConfigurationVariableOrUndefined("optionalVariable");
config.getConfigurationVariables();
```

## Variables

The keys in the optional and required variable section are the names you wish to use in code for your variables. The values should refer to the datasource location you wish to take a configuration value from.

```javascript
{
  nameToReferToInCode: "name-in-datasource";
}
```

## Optional Variables

```javascript
const config = new Configuration(
  { someCanHaveVariable: "some-non-critical-variable" },
  {},
  [dataSource]
);
```

The first parameter to Configuration is optional variables. If these variables are not found in the datasource at startup time they will return undefined when you attempt to retrieve them.

## Required Variables

```javascript
const config = new Configuration(
  {},
  { someMustHaveVariable: "some-critical-variable" },
  [dataSource]
);
```

The second parameter to Configuration is required variables. If these variables are not found in the datasource at startup time, the Configuration will throw an error.

## Datasources

This should be an array of key-value objects. If two or more datasources provide a value for a given variable, the earliest in the list will take priority. Process.env can be given as a datasource.

## Accessors

### getConfigurationVariables

Get the entire configuration object as a key-value object. The variables specified as 'optional' will be potentially undefined.

### getConfigurationVariable

Get the value of a required environment variable. This will have the type of string.

### getConfigurationVariableOrUndefined

Get the value of an optional environment variable. This will have the type of string | undefined.
