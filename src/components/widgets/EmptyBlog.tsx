import { FileQuestionMark, RotateCcw, FileText } from "lucide-react";

import i18n from "@i18n/translation";
import I18nKey from "@i18n/i18nKey";
import { Button } from "@ui/button";

export default function EmptyBlog({}) {
  return (
    <div className="flex gap-4 flex-col justify-center items-center h-full border rounded-xl bg-neutral-900">
      <div className="flex items-center justify-center bg-neutral-800 rounded-lg size-9 border">
        <FileQuestionMark size={20} />
      </div>
      <div className="text-center text-neutral-400">
        <p className="text-2xl font-bold">{i18n(I18nKey.empty_blog_title)}</p>
        <p className="text-sm mt-2">{i18n(I18nKey.empty_blog_description)}</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => window.location.reload()}
        >
          <RotateCcw />
          {i18n(I18nKey.empty_blog_refresh)}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() =>
            window.open("https://github.com/510208/sh-blog-next", "_blank")
          }
        >
          <FileText />
          {i18n(I18nKey.empty_blog_docs)}
        </Button>
      </div>
    </div>
  );
}
