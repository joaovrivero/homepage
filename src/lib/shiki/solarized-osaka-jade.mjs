/**
 * Solarized Osaka Jade — Shiki/TextMate theme.
 * Mirrors the site-wide palette so code blocks match the editor theme.
 */
export const solarizedOsakaJade = {
  name: "solarized-osaka-jade",
  type: "dark",
  colors: {
    "editor.background": "#0D1413",
    "editor.foreground": "#CBD8D2",
    "editorLineNumber.foreground": "#536D67",
    "editor.selectionBackground": "#263A36",
  },
  settings: [
    {
      settings: {
        background: "#0D1413",
        foreground: "#CBD8D2",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment", "string.comment"],
      settings: { foreground: "#536D67", fontStyle: "italic" },
    },
    {
      scope: [
        "string",
        "string.quoted",
        "string.template",
        "punctuation.definition.string",
        "markup.inline.raw",
      ],
      settings: { foreground: "#71CEAD" },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call.generic",
        "variable.function",
      ],
      settings: { foreground: "#54B9C5" },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "entity.name.namespace",
        "support.type",
        "support.class",
        "entity.other.inherited-class",
        "meta.type.name",
      ],
      settings: { foreground: "#72C7D1" },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "storage",
        "storage.type",
        "storage.modifier",
        "keyword.other.special-method",
      ],
      settings: { foreground: "#B77EE0" },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.character",
        "constant.other",
        "keyword.other.unit",
      ],
      settings: { foreground: "#E7C664" },
    },
    {
      scope: ["keyword.operator", "punctuation.separator.key-value", "storage.type.function.arrow"],
      settings: { foreground: "#53C2B6" },
    },
    {
      scope: ["variable", "variable.other", "variable.parameter", "meta.definition.variable"],
      settings: { foreground: "#CBD8D2" },
    },
    {
      scope: ["punctuation", "meta.brace", "punctuation.definition"],
      settings: { foreground: "#789188" },
    },
    {
      scope: ["entity.name.tag", "punctuation.definition.tag"],
      settings: { foreground: "#509475" },
    },
    {
      scope: ["entity.other.attribute-name", "meta.attribute"],
      settings: { foreground: "#78DCCA" },
    },
    {
      scope: [
        "variable.other.property",
        "support.type.property-name",
        "meta.object-literal.key",
        "string.unquoted.plain.out.yaml",
      ],
      settings: { foreground: "#CBD8D2" },
    },
    {
      scope: ["support.constant", "variable.language"],
      settings: { foreground: "#FFD580" },
    },
    {
      scope: ["invalid", "invalid.illegal", "message.error"],
      settings: { foreground: "#E55C7A" },
    },
    {
      scope: ["markup.deleted"],
      settings: { foreground: "#E55C7A" },
    },
    {
      scope: ["markup.inserted"],
      settings: { foreground: "#71CEAD" },
    },
    {
      scope: ["markup.changed"],
      settings: { foreground: "#E7C664" },
    },
    {
      scope: ["markup.heading", "entity.name.section"],
      settings: { foreground: "#E2E9E5", fontStyle: "bold" },
    },
    {
      scope: ["markup.italic"],
      settings: { fontStyle: "italic" },
    },
    {
      scope: ["markup.bold"],
      settings: { fontStyle: "bold" },
    },
    {
      scope: ["markup.underline.link", "string.other.link"],
      settings: { foreground: "#54B9C5" },
    },
  ],
};
