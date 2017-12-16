var config = {
    platformName: "Dashcoin.me",
    platformEmail: "support@democats.org",
    apiUrl: "https://api.dashcoin.me/",
    coinUnitPlaces: 12,
    txMinConfirms: 10,
    openAliasPrefix: "dsh",
    coinSymbol: 'DSH',
    coinName: 'Dashcoin',
    coinUriPrefix: 'dashcoin:',
    addressPrefix: 72,
    feePerKB: new JSBigInt('1000000000'),//10^10
    dustThreshold: new JSBigInt('1000000'),//10^10 used for choosing outputs/change - we decompose all the way down if the receiver wants now regardless of threshold
    txChargeRatio: 0.5,
    defaultMixin: 3,
    txChargeAddress: 'D8N2mzVM4vibM8fPLafUKDf5HuctF7156AnTcGAcnHJF5iiteRqz1rWh3aWN9KJHHbJkfG9LwE3qfNy67iN8i2JBRATevMK',
    viewSecretKey: '104488368bb03fcd0c8af422327b5331034c84fdd52f25df72dad6aedf0d340b',
    idleTimeout: 10,
    idleWarningDuration: 20,
    maxBlockNumber: 500000000,
    avgBlockTime: 120,
    debugMode: true
};
