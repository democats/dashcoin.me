var config = {
    platformName: "Dashcoin.me",
    platformEmail: "support@democats.org",
    apiUrl: "https://api.dashcoin.me/",
    coinUnitPlaces: 12,
    txMinConfirms: 10,
    openAliasPrefix: "coal",
    coinSymbol: 'COAL',
    coinName: 'Bitcoal',
    coinUriPrefix: 'bitcoal:',
    addressPrefix: 70,
    feePerKB: new JSBigInt('1000000000'),//10^10
    dustThreshold: new JSBigInt('1000000'),//10^10 used for choosing outputs/change - we decompose all the way down if the receiver wants now regardless of threshold
    txChargeRatio: 0.5,
    defaultMixin: 3,
    txChargeAddress: 'CqQz52MDgcB7yLUaC3pHge3VzLjyMQ61E6P44N4xLscGcWjcDzqF3NUdXneX7mVDL1WvXaGjk7UrrXMwFmQc7JtiACK7xjM',
    viewSecretKey: '104488368bb03fcd0c8af422327b5331034c84fdd52f25df72dad6aedf0d340b',
    idleTimeout: 10,
    idleWarningDuration: 20,
    maxBlockNumber: 500000000,
    avgBlockTime: 120,
    debugMode: true
};
