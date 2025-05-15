export const constextractAnnotations = (html) => {
    const annotationRegex =
      /<cmsannotation[^>]*annotationid="([^"]+)"[^>]*>(.*?)<\/cmsannotation>/g;
    const spanContentRegex = /<span[^>]*>(.*?)<\/span>/;
    const result = [];
    let match;
    while ((match = annotationRegex.exec(html)) !== null) {
      const annotationId = match[1];
      const cmsannotationContent = match[2];
      const spanMatch = spanContentRegex.exec(cmsannotationContent);
      const spanContent = spanMatch ? spanMatch[1] : "";
      result.push({ annotationId, spanContent });
    }
    return result;
  };