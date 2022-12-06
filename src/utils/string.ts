enum StringColors {
  grey = "\x1b[30m",
  red = "\x1b[31m",
  green = "\x1b[32m",
  yellow = "\x1b[33m",
  blue = "\x1b[34m",
  pink = "\x1b[35m",
  white = "\x1b[37m",
  null = "\x1b[0m",
}

const StringUtils = {
  app: `[${StringColors.green}APP${StringColors.null}]`,
};

export { StringColors, StringUtils };
