// @flow weak

import React, { useState, createContext, useContext, useCallback } from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import HeaderToolbar from "../HeaderToolbar"
import HeaderDrawer from "../HeaderDrawer"

export const HeaderContext = createContext({
  recentItems: [],
  onClickTemplate: () => null,
  onClickHome: () => null,
  onOpenFile: () => null,
  onOpenRecentItem: () => null,
  isDesktop: false,
  inSession: false,
  onJoinSession: () => null,
  onCreateSession: () => null,
  onLeaveSession: () => null,
  sessionBoxOpen: false,
  changeSessionBoxOpen: () => null,
  fileOpen: false,
  onDownload: () => null
})

const emptyArray = []

export default ({
  additionalButtons = emptyArray,
  title = "Universal Data Tool",
  currentTab,
  onChangeTab,
  tabs = emptyArray
}) => {
  const [drawerOpen, changeDrawerOpen] = useState(false)
  let headerContext = useContext(HeaderContext)
  if (!headerContext.recentItems) headerContext.recentItems = []

  const isSmall = useMediaQuery("(max-width: 800px)")

  const onOpenDrawer = useCallback(() => changeDrawerOpen(true), [])
  const onCloseDrawer = useCallback(() => changeDrawerOpen(false), [])

  return (
    <>
      <HeaderToolbar
        tabs={tabs}
        currentTab={currentTab}
        onChangeTab={onChangeTab}
        additionalButtons={additionalButtons}
        onOpenDrawer={onOpenDrawer}
        isSmall={isSmall}
        {...headerContext}
        title={title}
      />
      <HeaderDrawer
        drawerOpen={drawerOpen}
        onCloseDrawer={onCloseDrawer}
        onClickHome={headerContext.onClickHome}
        recentItems={headerContext.recentItems}
        onOpenFile={headerContext.onOpenFile}
        onClickTemplate={headerContext.onClickTemplate}
        onOpenRecentItem={headerContext.onOpenRecentItem}
      />
    </>
  )
}
