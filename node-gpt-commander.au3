#AutoIt3Wrapper_icon=icon.ico

#include <GUIConstantsEx.au3>
#include <WindowsConstants.au3>
#include <MsgBoxConstants.au3>

HotKeySet("{F2}", "HandleHotKey")

Func HandleHotKey()
    Run(@ComSpec & " /c node ./dist/index.js", @ScriptDir, @SW_HIDE)
EndFunc

While 1
    Sleep(100)
WEnd