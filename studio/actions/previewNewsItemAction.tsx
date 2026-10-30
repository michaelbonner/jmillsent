import { useEffect, useState } from 'react'
import { CopyIcon, LaunchIcon } from '@sanity/icons'
import { Button, Flex, Stack, Text, TextInput, useToast } from '@sanity/ui'
import { useClient, type DocumentActionComponent } from 'sanity'

const SITE_URL = 'https://www.jmillsent.com'

// Lives at a dotted _id so it isn't readable without auth on the public dataset.
// The web app's /api/preview route checks against the same document.
const SECRET_ID = 'secrets.newsPreview'

export const previewNewsItemAction: DocumentActionComponent = ({
  draft,
  published,
}) => {
  const client = useClient({ apiVersion: '2025-02-19' })
  const toast = useToast()
  const [secret, setSecret] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const doc = draft ?? published
  const slug = (doc?.slug as { current?: string } | undefined)?.current

  useEffect(() => {
    client
      .fetch<string | null>(
        `*[_id == $id][0].secret`,
        { id: SECRET_ID },
        { perspective: 'raw' }
      )
      .then(setSecret)
      .catch(() => setSecret(null))
  }, [client])

  const previewUrl =
    secret && slug
      ? `${SITE_URL}/api/preview?secret=${encodeURIComponent(secret)}&slug=${encodeURIComponent(slug)}`
      : null

  const copy = async () => {
    if (!previewUrl) return
    await navigator.clipboard.writeText(previewUrl)
    toast.push({ status: 'success', title: 'Preview link copied' })
  }

  return {
    label: 'Preview post',
    icon: LaunchIcon,
    disabled: !previewUrl,
    title: !slug
      ? 'Add a slug to preview this post'
      : !secret
        ? 'Preview secret not found'
        : 'Preview this post on the website, including unpublished changes',
    onHandle: () => setIsOpen(true),
    dialog:
      isOpen && previewUrl
        ? {
            type: 'dialog',
            header: 'Preview post',
            onClose: () => setIsOpen(false),
            content: (
              <Stack space={4}>
                <Text size={1} muted>
                  Anyone with this link can view the latest draft of this post,
                  including unpublished changes. Share it only with people who
                  should see it.
                </Text>
                <TextInput
                  readOnly
                  value={previewUrl}
                  onFocus={(e) => e.currentTarget.select()}
                />
                <Flex gap={2} justify="flex-end">
                  <Button
                    icon={CopyIcon}
                    text="Copy link"
                    mode="ghost"
                    onClick={copy}
                  />
                  <Button
                    as="a"
                    href={previewUrl}
                    target="_blank"
                    rel="noreferrer"
                    icon={LaunchIcon}
                    text="Open preview"
                    tone="primary"
                  />
                </Flex>
              </Stack>
            ),
          }
        : null,
  }
}
