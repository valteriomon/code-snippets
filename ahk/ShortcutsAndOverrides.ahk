#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

$F8:: Send {Media_Prev}
RAlt & F8:: SendInput, {F8}

$F9:: Send {Media_Play_Pause}
RAlt & F9:: SendInput, {F9}

$F10:: Send {Media_Next}
RAlt & F10:: SendInput, {F10}

$F11:: Send {Volume_Mute}
RAlt & F11:: SendInput, {F11}

$F12:: Send {Volume_Down 1}
RAlt & F12:: SendInput, {F12}

;Bitwarden
^!b::
Run, C:\Users\Wally\AppData\Local\Programs\Bitwarden\Bitwarden.exe
return

;Everything
^!e::
Run, C:\Program Files\Everything\Everything.exe
return

;Inoreader
^!i::
Run, "C:\Program Files\Google\Chrome\Application\chrome_proxy.exe" --profile-directory="Profile 1" --app-id=lnabneoegdnfkogedbhhmfmpfldogfjo
return

;Joplin
^!j::
Run, C:\Users\Wally\AppData\Local\Programs\Joplin\Joplin.exe
return

;Keep
^!k::
Run, "C:\Program Files\Google\Chrome\Application\chrome_proxy.exe" --profile-directory="Profile 1" --app-id=eilembjdkfgodjkcjnpgpaenohkicgjd
return

;TickTick
^!t::
Run, "C:\Program Files\Google\Chrome\Application\chrome_proxy.exe" --profile-directory="Profile 1" --app-id=cfammbeebmjdpoppachopcohfchgjapd
return

;Toggl
^!o::
Run, "C:\Program Files\Google\Chrome\Application\chrome_proxy.exe"  --profile-directory="Profile 1" --app-id=chpiljhfemlfpnfoohpbokdofonkiifm
return

;PodcastRepublic
^!p::
Run, C:\Users\Wally\AppData\Local\Microsoft\WindowsApps\MicrosoftCorporationII.WindowsSubsystemForAndroid_8wekyb3d8bbwe\WsaClient.exe /launch wsa://com.itunestoppodcastplayer.app
return

;WhatsApp
^!w::
Run, "C:\Program Files\Google\Chrome\Application\chrome_proxy.exe"  --profile-directory="Profile 1" --app-id=hnpfjngllnobngcgfapefoaidbinmjnm
return

;YoutubeMusic
^!y::
Run, "C:\Program Files\Google\Chrome\Application\chrome_proxy.exe"  --profile-directory="Profile 1" --app-id=cinhimbnkkaeohfgghhklpknlkffjgod
return

;Calendar
;Pocket
;Raindrop

;^#Down::^#Right
;^#Up::^#Left

#NoTrayIcon