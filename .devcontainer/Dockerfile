# Development container for osu! Timing Indicator
FROM node:20-bookworm

# Install dependencies for Electron
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libxshmfence1 \
    libglu1-mesa \
    xvfb \
    dbus-x11 \
    && rm -rf /var/lib/apt/lists/*

# Set display for headless environment
ENV DISPLAY=:99

# Create a script to start Xvfb
RUN echo '#!/bin/bash\nXvfb :99 -screen 0 1920x1080x24 &\nsleep 1\nexec "$@"' > /usr/local/bin/xvfb-run-custom.sh \
    && chmod +x /usr/local/bin/xvfb-run-custom.sh

# Set npm global directory to avoid permission issues
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Switch to node user
USER node

# Set working directory
WORKDIR /workspace

# Default command
CMD ["bash"]
