interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  // Simple markdown parser for basic formatting
  const sections = content.split('\n\n');

  return (
    <div className="prose prose-sm max-w-none mt-8 space-y-6 text-foreground">
      {sections.map((section, index) => {
        if (section.startsWith('##')) {
          const title = section.replace('## ', '');
          return (
            <h2 key={index} className="scroll-mt-20 text-2xl font-bold text-foreground">
              {title}
            </h2>
          );
        }

        if (section.startsWith('###')) {
          const title = section.replace('### ', '');
          return (
            <h3 key={index} className="scroll-mt-20 text-xl font-semibold text-foreground">
              {title}
            </h3>
          );
        }

        if (section.includes('- ')) {
          const items = section.split('\n').filter((item) => item.startsWith('- '));
          return (
            <ul key={index} className="space-y-2 pl-6 list-disc text-foreground/80">
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>{item.replace('- ', '')}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="text-base leading-relaxed text-foreground/80 text-pretty">
            {section}
          </p>
        );
      })}
    </div>
  );
}
