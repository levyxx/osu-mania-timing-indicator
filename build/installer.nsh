; Custom NSIS script to handle running application

!macro customInit
  ; Check if the application is running and kill it
  nsExec::ExecToStack 'taskkill /F /IM "osu! Timing Indicator.exe"'
  ; Small delay to ensure process is terminated
  Sleep 1000
!macroend

!macro customInstall
  ; Nothing custom needed here
!macroend

!macro customUnInit
  ; Kill the application before uninstall
  nsExec::ExecToStack 'taskkill /F /IM "osu! Timing Indicator.exe"'
  Sleep 1000
!macroend
