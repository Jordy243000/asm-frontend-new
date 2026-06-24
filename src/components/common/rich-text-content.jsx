function toHtml(content) {
  if (!content) {
    return "";
  }

  if (content.includes("<")) {
    return content;
  }

  return content
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${block.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

const RichTextContent = ({ content, className = "" }) => {
  const html = toHtml(content);

  if (!html) {
    return null;
  }

  return (
    <div
      className={`asm-richtext ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default RichTextContent;
