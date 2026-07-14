import {
  ConversationComposer,
  ConversationComposerBar,
  ConversationMessageList,
  ConversationPanelSlot,
  ConversationShell,
  ConversationViewport,
} from '@/components/conversation'
import { CommandMenu } from '@/features/home/components/chat/command-menu'
import { renderHomeMessageContent } from '@/features/home/components/chat/home-message-content'
import { HomePanelContent } from '@/features/home/components/panels/home-panel-content'
import { useHomeChatController } from '@/features/home/hooks/use-home-chat-controller'
import { useMessages } from '@/hooks/use-locale'

export function HomePage() {
  const t = useMessages()
  const controller = useHomeChatController()

  return (
    <ConversationShell>
      <ConversationViewport ref={controller.scrollViewportRef}>
        <ConversationMessageList
          messages={controller.messages}
          panelSlot={
            <ConversationPanelSlot
              isActive={Boolean(controller.activePanel)}
              phase={controller.panelPhase}
            >
              {controller.activePanel ? (
                <HomePanelContent panel={controller.activePanel} resetToken={controller.panelResetToken} />
              ) : null}
            </ConversationPanelSlot>
          }
          renderMessageContent={(message) => renderHomeMessageContent(message, t.home.chat.streaming)}
          streamingLabel={t.home.chat.streaming}
        />
      </ConversationViewport>

      <ConversationComposerBar onSubmit={controller.handleSubmit}>
        {controller.isCommandMenuOpen ? (
          <CommandMenu
            commands={controller.filteredCommands}
            highlightedCommandIndex={controller.highlightedCommandIndex}
            onHighlight={controller.setHighlightedCommandIndex}
            onSelect={controller.applyCommandSelection}
          />
        ) : null}

        <ConversationComposer
          disabled={controller.isAnyStreaming}
          inputValue={controller.inputValue}
          onChange={controller.handleComposerChange}
          onCompositionEnd={controller.handleCompositionEnd}
          onCompositionStart={controller.handleCompositionStart}
          onKeyDown={controller.handleTextareaKeyDown}
          placeholder={controller.isAnyStreaming ? controller.streamingComposerText : t.home.chat.inputPlaceholder}
          sendLabel={t.home.chat.send}
          streamingLabel={t.home.chat.streaming}
          textareaRef={controller.textareaRef}
        />
      </ConversationComposerBar>
    </ConversationShell>
  )
}
