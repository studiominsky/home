'use client';

import React from 'react';
import WebAppVisual from './WebAppVisual';
import WebsiteVisual from './WebsiteVisual';
import DataVizVisual from './DataVizVisual';
import ChatbotVisual from './ChatbotVisual';
import AiVisual from './AiVisual';

interface ServiceVisualProps {
  activeIndex: number;
}

const ServiceVisual: React.FC<ServiceVisualProps> = ({
  activeIndex,
}) => {
  switch (activeIndex) {
    case 0:
      return <WebAppVisual />;
    case 1:
      return <WebsiteVisual />;
    case 2:
      return <DataVizVisual />;
    case 3:
      return <AiVisual />;
    case 4:
      return <ChatbotVisual />;
    default:
      return <WebAppVisual />;
  }
};

export default ServiceVisual;
