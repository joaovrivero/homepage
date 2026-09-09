/**
 * Pinacoteca — Shiki/TextMate theme.
 * Mirrors the site-wide palette so code blocks match the editor theme.
 * Source of truth: dotfiles/theme/pinacoteca/colors.toml
 */
export const pinacoteca = {
  name: "pinacoteca",
  type: "dark",
  colors: {
    "editor.background": "#120D09",
    "editor.foreground": "#E6CCAF",
    "editorLineNumber.foreground": "#453B32",
    "editor.selectionBackground": "#453B32",
  },
  settings: [
    {
      settings: {
        background: "#120D09",
        foreground: "#E6CCAF",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment", "string.comment"],
      settings: { foreground: "#7D6B59", fontStyle: "italic" },
    },
    {
      scope: [
        "punctuation",
        "meta.brace",
        "punctuation.separator",
        "punctuation.terminator",
        "punctuation.definition.string",
        "keyword.operator",
        "punctuation.separator.key-value",
        "storage.type.function.arrow",
        "punctuation.definition.tag",
      ],
      settings: { foreground: "#B19A80" },
    },
    {
      scope: [
        "variable",
        "variable.other",
        "variable.parameter",
        "variable.other.property",
        "variable.other.object.property",
        "meta.object-literal.key",
        "support.variable",
        "entity.other.attribute-name",
        "entity.name.namespace",
      ],
      settings: { foreground: "#E6CCAF" },
    },
    {
      scope: ["variable.language", "support.variable.property.dom"],
      settings: { foreground: "#D67066" },
    },
    {
      scope: ["string", "string.quoted", "string.template", "markup.inline.raw"],
      settings: { foreground: "#88AB75" },
    },
    {
      scope: [
        "constant.character.escape",
        "string.regexp",
        "punctuation.definition.template-expression",
        "punctuation.section.embedded",
      ],
      settings: { foreground: "#6CABAB" },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call.generic",
        "variable.function",
        "entity.name.tag",
      ],
      settings: { foreground: "#799DBB" },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
        "entity.other.inherited-class",
        "meta.type.name",
        "entity.name.type.module",
      ],
      settings: { foreground: "#D7A447" },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "storage",
        "storage.type",
        "storage.modifier",
        "keyword.other.special-method",
        "keyword.other.unit",
      ],
      settings: { foreground: "#AD8AB6" },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.character",
        "constant.other",
        "support.constant",
      ],
      settings: { foreground: "#D77F47" },
    },
    {
      scope: ["markup.heading", "entity.name.section"],
      settings: { foreground: "#D7A447", fontStyle: "bold" },
    },
    { scope: ["markup.bold"], settings: { fontStyle: "bold" } },
    { scope: ["markup.italic"], settings: { fontStyle: "italic" } },
    {
      scope: ["markup.underline.link", "string.other.link"],
      settings: { foreground: "#799DBB" },
    },
    { scope: ["markup.inserted"], settings: { foreground: "#88AB75" } },
    { scope: ["markup.deleted"], settings: { foreground: "#D67066" } },
    { scope: ["markup.changed"], settings: { foreground: "#799DBB" } },
    { scope: ["invalid", "invalid.illegal"], settings: { foreground: "#D67066" } },
    {
      scope: ["support.type.property-name", "meta.property-name", "entity.name.tag.toml"],
      settings: { foreground: "#799DBB" },
    },
  ],
};
