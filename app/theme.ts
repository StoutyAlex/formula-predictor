import { createSystem, defaultConfig, defineSemanticTokens } from '@chakra-ui/react';

const semanticTokens = defineSemanticTokens({
  colors: {
    bg: { value: '#0E1015' },
    accent: { value: '#E10700' },
  },
});

const themeConfig = {
  theme: {
    semanticTokens,
  },
};

export default createSystem(defaultConfig, themeConfig);
