export default function getGlobalVariablesScript(route) {
  return {
    __html: `var an_disableAppInit = ${
      route.type === 'not_found' ? 'true' : 'false'
    };`,
  };
}
