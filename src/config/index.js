export const baseConfig = [
  {
    name: 'english',
    channel: 183,
    route: '',
    langCode: 'en',
    domain: (process.env.NEXT_PUBLIC_WEBAPP_BASE_URL || '').replace(
      /(https:\/\/)|www.|\/\w+/g,
      '',
    ),
    baseUrl: process.env.NEXT_PUBLIC_WEBAPP_BASE_URL,
    apiUrl: process.env.API_URL,
    langIdentifier: '',
  },
];

function createConfig() {
  const langConfig = {},
    langKeys = {},
    langChannel = {},
    langName = {},
    langNameChannel = {};
  baseConfig?.map((lang, i) => {
    langConfig[lang.name] = lang;
    langConfig[lang.channel] = lang;
    langKeys[lang.name] = lang.name;
    langChannel[lang.name] = lang.channel;
    langName[lang.channel] = lang.name;
    langNameChannel[lang.name] = lang.channel;
    langNameChannel[lang.channel] = lang.name;
  });
  return { langConfig, langKeys, langChannel, langName, langNameChannel };
}
const config = createConfig();

export const { langConfig, langKeys, langChannel, langName, langNameChannel } =
  config;
