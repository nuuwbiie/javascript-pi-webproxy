import { useState, useRef, useEffect } from 'react'
import type { AppId, WindowPayload } from '../types'

interface QuickSettingsProps {
  isOpen: boolean
  onClose: () => void
  onOpenApp: (appId: AppId, payload?: WindowPayload) => void
}

/* Windows 11 SVG Icons extracted directly from user's Figma SVG */
function WinWifiIcon() {
  return (
    <svg width="18" height="13" viewBox="100 75 16 12" fill="none" aria-hidden="true">
      <path
        d="M108 76C107.438 76 106.88 76.0573 106.328 76.1719C105.781 76.2812 105.25 76.4453 104.734 76.6641C104.219 76.8776 103.727 77.1406 103.258 77.4531C102.789 77.7656 102.357 78.1224 101.961 78.5234C101.763 78.7214 101.586 78.9297 101.43 79.1484C101.273 79.362 101.107 79.5729 100.93 79.7812C100.867 79.8542 100.807 79.9089 100.75 79.9453C100.693 79.9818 100.615 80 100.516 80C100.375 80 100.255 79.9531 100.156 79.8594C100.062 79.7604 100.016 79.6406 100.016 79.5C100.016 79.401 100.044 79.3073 100.102 79.2188C100.513 78.5625 101.01 77.974 101.594 77.4531C102.182 76.9323 102.823 76.4896 103.516 76.125C104.208 75.7604 104.935 75.4818 105.695 75.2891C106.461 75.0964 107.229 75 108 75C108.766 75 109.531 75.0964 110.297 75.2891C111.062 75.4818 111.789 75.7604 112.477 76.125C113.169 76.4896 113.807 76.9323 114.391 77.4531C114.979 77.974 115.482 78.5625 115.898 79.2188C115.956 79.3073 115.984 79.401 115.984 79.5C115.984 79.6406 115.935 79.7604 115.836 79.8594C115.742 79.9531 115.625 80 115.484 80C115.396 80 115.318 79.9818 115.25 79.9453C115.188 79.9036 115.128 79.849 115.07 79.7812C115.013 79.7083 114.958 79.6354 114.906 79.5625C114.859 79.4844 114.807 79.4089 114.75 79.3359C114.641 79.1901 114.526 79.0521 114.406 78.9219C114.286 78.7865 114.164 78.6536 114.039 78.5234C113.638 78.1224 113.203 77.7656 112.734 77.4531C112.271 77.1406 111.781 76.8776 111.266 76.6641C110.755 76.4453 110.224 76.2812 109.672 76.1719C109.12 76.0573 108.562 76 108 76ZM108 79C107.615 79 107.232 79.0417 106.852 79.125C106.471 79.2083 106.104 79.3307 105.75 79.4922C105.401 79.6484 105.068 79.8411 104.75 80.0703C104.438 80.2995 104.154 80.5573 103.898 80.8438C103.773 80.9844 103.659 81.1328 103.555 81.2891C103.456 81.4453 103.349 81.599 103.234 81.75C103.172 81.8281 103.109 81.8906 103.047 81.9375C102.99 81.9792 102.909 82 102.805 82C102.669 82 102.552 81.9505 102.453 81.8516C102.354 81.7526 102.305 81.6354 102.305 81.5C102.305 81.4167 102.326 81.3333 102.367 81.25C102.633 80.7552 102.971 80.3073 103.383 79.9062C103.794 79.5052 104.25 79.1641 104.75 78.8828C105.25 78.6016 105.776 78.3854 106.328 78.2344C106.885 78.0781 107.443 78 108 78C108.552 78 109.107 78.0781 109.664 78.2344C110.221 78.3854 110.75 78.6016 111.25 78.8828C111.75 79.1641 112.206 79.5052 112.617 79.9062C113.029 80.3073 113.367 80.7552 113.633 81.25C113.674 81.3333 113.695 81.4167 113.695 81.5C113.695 81.6354 113.646 81.7526 113.547 81.8516C113.448 81.9505 113.331 82 113.195 82C113.091 82 113.008 81.9792 112.945 81.9375C112.888 81.8906 112.828 81.8281 112.766 81.75C112.651 81.599 112.542 81.4453 112.438 81.2891C112.339 81.1328 112.227 80.9844 112.102 80.8438C111.846 80.5573 111.56 80.2995 111.242 80.0703C110.93 79.8411 110.596 79.6484 110.242 79.4922C109.893 79.3307 109.529 79.2083 109.148 79.125C108.768 79.0417 108.385 79 108 79ZM108 82C107.708 82 107.43 82.0417 107.164 82.125C106.898 82.2031 106.641 82.3177 106.391 82.4688C106.25 82.5573 106.128 82.6458 106.023 82.7344C105.924 82.8229 105.833 82.9167 105.75 83.0156C105.672 83.1146 105.596 83.2214 105.523 83.3359C105.451 83.4453 105.372 83.5703 105.289 83.7109C105.237 83.7995 105.174 83.8698 105.102 83.9219C105.029 83.974 104.94 84 104.836 84C104.695 84 104.576 83.9505 104.477 83.8516C104.383 83.7526 104.336 83.6328 104.336 83.4922C104.336 83.4245 104.352 83.3542 104.383 83.2812C104.534 82.9479 104.74 82.6406 105 82.3594C105.26 82.0781 105.552 81.8385 105.875 81.6406C106.198 81.4375 106.542 81.2812 106.906 81.1719C107.271 81.0573 107.635 81 108 81C108.375 81 108.745 81.0547 109.109 81.1641C109.474 81.2734 109.815 81.4271 110.133 81.625C110.456 81.8229 110.745 82.0625 111 82.3438C111.255 82.625 111.461 82.9375 111.617 83.2812C111.648 83.3542 111.664 83.4245 111.664 83.4922C111.664 83.6276 111.615 83.7474 111.516 83.8516C111.417 83.9505 111.299 84 111.164 84C111.06 84 110.971 83.974 110.898 83.9219C110.826 83.8698 110.763 83.7995 110.711 83.7109C110.628 83.5703 110.549 83.4453 110.477 83.3359C110.404 83.2214 110.326 83.1146 110.242 83.0156C110.159 82.9167 110.065 82.8229 109.961 82.7344C109.862 82.6458 109.742 82.5573 109.602 82.4688C109.357 82.3177 109.099 82.2031 108.828 82.125C108.562 82.0417 108.286 82 108 82ZM106.75 85C106.75 84.8281 106.784 84.6667 106.852 84.5156C106.919 84.3646 107.008 84.2344 107.117 84.125C107.232 84.0104 107.365 83.9193 107.516 83.8516C107.667 83.7839 107.828 83.75 108 83.75C108.172 83.75 108.333 83.7839 108.484 83.8516C108.635 83.9193 108.766 84.0104 108.875 84.125C108.99 84.2344 109.081 84.3646 109.148 84.5156C109.216 84.6667 109.25 84.8281 109.25 85C109.25 85.1719 109.216 85.3333 109.148 85.4844C109.081 85.6354 108.99 85.7682 108.875 85.8828C108.766 85.9922 108.635 86.0807 108.484 86.1484C108.333 86.2161 108.172 86.25 108 86.25C107.828 86.25 107.667 86.2161 107.516 86.1484C107.365 86.0807 107.232 85.9922 107.117 85.8828C107.008 85.7682 106.919 85.6354 106.852 85.4844C106.784 85.3333 106.75 85.1719 106.75 85Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WinBluetoothIcon() {
  return (
    <svg width="10" height="16" viewBox="213 73 9 16" fill="none" aria-hidden="true">
      <path
        d="M217 82.1016L213.828 84.875C213.74 84.9583 213.63 85 213.5 85C213.359 85 213.24 84.9505 213.141 84.8516C213.047 84.7526 213 84.6328 213 84.4922C213 84.3464 213.057 84.224 213.172 84.125L216.742 81L213.172 77.875C213.057 77.776 213 77.651 213 77.5C213 77.3594 213.047 77.2422 213.141 77.1484C213.24 77.0495 213.359 77 213.5 77C213.63 77 213.74 77.0417 213.828 77.125L217 79.8984V73.5C217 73.3646 217.049 73.2474 217.148 73.1484C217.253 73.0495 217.372 73 217.508 73C217.638 73 217.753 73.0495 217.852 73.1484L221.852 77.1484C221.951 77.2474 222 77.362 222 77.4922C222 77.6484 221.943 77.776 221.828 77.875L218.258 81L221.828 84.125C221.891 84.1823 221.935 84.2396 221.961 84.2969C221.987 84.3542 222 84.4245 222 84.5078C222 84.638 221.951 84.7526 221.852 84.8516L217.852 88.8516C217.753 88.9505 217.635 89 217.5 89C217.365 89 217.247 88.9505 217.148 88.8516C217.049 88.7526 217 88.6354 217 88.5V82.1016ZM218 74.7031V79.8984L220.766 77.4766L218 74.7031ZM218 82.1016V87.2891L220.766 84.5234L218 82.1016Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WinAirplaneIcon() {
  return (
    <svg width="16" height="16" viewBox="346 73 16 16" fill="none" aria-hidden="true">
      <path
        d="M351.109 87.7578L351.781 83H349.445L347.875 84.8281C347.776 84.9427 347.651 85 347.5 85H346.5C346.365 85 346.247 84.9505 346.148 84.8516C346.049 84.7526 346 84.6354 346 84.5V77.5078C346 77.3724 346.049 77.2552 346.148 77.1562C346.247 77.0573 346.365 77.0078 346.5 77.0078H347.5C347.651 77.0078 347.776 77.0651 347.875 77.1797L349.445 79.0078H351.781L351.125 74.4375C351.109 74.0677 351.143 73.901 351.211 73.75C351.284 73.5938 351.38 73.4609 351.5 73.3516C351.625 73.2422 351.766 73.1562 351.922 73.0938C352.083 73.0312 352.253 73 352.43 73C352.638 73 352.841 73.0365 353.039 73.1094C353.242 73.1771 353.43 73.2708 353.602 73.3906C353.779 73.5104 353.935 73.6536 354.07 73.8203C354.206 73.987 354.315 74.1641 354.398 74.3516L356.398 79.0078H359.992C360.268 79.0078 360.526 79.0599 360.766 79.1641C361.01 79.2682 361.224 79.4115 361.406 79.5938C361.589 79.776 361.732 79.9896 361.836 80.2344C361.94 80.474 361.992 80.7318 361.992 81.0078C361.992 81.2839 361.938 81.5417 361.828 81.7812C361.724 82.0208 361.581 82.2318 361.398 82.4141C361.221 82.5964 361.01 82.7396 360.766 82.8438C360.521 82.9479 360.263 83 359.992 83H356.398L354.398 87.6562C354.31 87.8594 354.195 88.0443 354.055 88.2109C353.914 88.3776 353.755 88.5208 353.578 88.6406C353.401 88.7552 353.208 88.8438 353 88.9062C352.797 88.9688 352.583 89 352.359 89C352.188 89 352.026 88.9688 351.875 88.9062C351.724 88.8385 351.591 88.75 351.477 88.6406C351.367 88.526 351.279 88.3932 351.211 88.2422C351.143 88.0911 351.109 87.9297 351.109 87.7578Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WinBatterySaverIcon() {
  return (
    <svg width="16" height="12" viewBox="126 171 16 11" fill="none" aria-hidden="true">
      <path
        d="M126.5 182C126.365 182 126.247 181.951 126.148 181.852C126.049 181.753 126 181.635 126 181.5C126 181.38 126.031 181.281 126.094 181.203C126.161 181.125 126.247 181.065 126.352 181.023C126.742 180.878 127.089 180.703 127.391 180.5C127.693 180.297 127.977 180.029 128.242 179.695C127.841 179.534 127.497 179.349 127.211 179.141C126.93 178.927 126.698 178.685 126.516 178.414C126.339 178.143 126.208 177.839 126.125 177.5C126.042 177.156 126 176.768 126 176.336C126 176.076 126.052 175.815 126.156 175.555C126.26 175.294 126.396 175.047 126.562 174.812C126.734 174.573 126.924 174.357 127.133 174.164C127.341 173.966 127.547 173.799 127.75 173.664C128.26 173.331 128.716 172.958 129.117 172.547C129.523 172.13 129.917 171.685 130.297 171.211C130.354 171.143 130.414 171.091 130.477 171.055C130.544 171.018 130.622 171 130.711 171C130.805 171 130.893 171.029 130.977 171.086C131.06 171.138 131.122 171.208 131.164 171.297L132.617 174.555C132.742 174.841 132.839 175.141 132.906 175.453C132.974 175.766 133.008 176.078 133.008 176.391C133.008 176.99 132.878 177.539 132.617 178.039C132.362 178.539 132.01 178.982 131.562 179.367H141C141.276 178.5 142 177.5 142 176.5V175.5H140V174.445C139.797 173.508 138.492 172.203 137.555 172H133.289L132.844 172H137.5C138.883 173.922 139 174.5 139 179.5V180.5C138.555 180.562 137.5 181 137.5 181H131.18C130.323 181.24 129.508 181.641 129.125 182H126.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WinNightLightIcon() {
  return (
    <svg width="15" height="16" viewBox="237 169 15 16" fill="none" aria-hidden="true">
      <path
        d="M237.273 181.195C237.273 181.044 237.307 180.93 237.375 180.852C237.448 180.768 237.544 180.695 237.664 180.633C237.81 180.555 237.966 180.492 238.133 180.445C238.299 180.393 238.458 180.336 238.609 180.273C239.062 180.091 239.508 179.885 239.945 179.656C240.388 179.427 240.805 179.164 241.195 178.867C241.685 178.497 242.115 178.083 242.484 177.625C242.859 177.167 243.169 176.674 243.414 176.148C243.659 175.622 243.844 175.07 243.969 174.492C244.094 173.914 244.156 173.32 244.156 172.711C244.156 172.206 244.117 171.714 244.039 171.234C243.961 170.75 243.87 170.263 243.766 169.773C243.75 169.633 243.807 169.326 244.344 169.039C245.576 169.177 247.102 169.68 247.938 170.094C249.602 171.383 250.859 173.023 251.648 174.93C251.93 177.016 251.641 179.141 250.836 181.047C249.586 182.656 247.969 183.906 246.055 184.711C244.672 184.992 243.938 184.992 242.047 184.758C240.219 184.07 238.609 182.984 237.375 181.539C237.273 181.32 237.273 181.195 237.273 181.195Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WinAccessibilityIcon() {
  return (
    <svg width="14" height="16" viewBox="335 169 15 16" fill="none" aria-hidden="true">
      <path
        d="M342 173C342.333 169 342.651 169.065 342.953 169.195C343.255 169.32 343.521 169.495 343.75 169.719C344.297 170.492 344.5 171.107 344.5 171.445C344.5 171.706 344.432 172.094 344.391 172.219L346.625 171.367C347.49 171.25 348.484 171.766 348.859 172.328C349 172.768 349 173.008 349 173.531L345 175.727V178.125L346.75 183.25C346.75 183.938 346.234 184.492 345.672 184.867C344.992 185 344.461 184.922 343.992 184.688L342 180.117L340 184.688C339.531 184.922 339 185 338.32 184.867C337.758 184.492 337.25 183.93 337.25 183.25L338.938 178.328V175.727L336.125 174.633C335.521 174.26 335.078 173.531 335 173C335 172.32 335.508 171.766 336.062 171.391L339.602 172.219C339.5 171.445 339.839 170.195 341.047 169.195C341.667 169 342 169 342 173Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WinSpeakerVolumeIcon() {
  return (
    <svg width="16" height="14" viewBox="85 274 16 14" fill="none" aria-hidden="true">
      <path
        d="M97 287.242C97.6641 286.438 98.6641 285.297 99.3984 283.961C99.8438 282.508 100 281.505 100 281C100 280.5 99.8438 279.5 99.3906 278.039C98.6562 276.695 97.6641 275.555 97.1875 275.141C97 274.609 97.2396 274.305 97.5 274.258C97.8125 274.367 98.5078 274.945 99.1562 275.703C100.164 277.32 100.789 279.117 101 281C100.789 282.891 100.164 284.68 99.1562 286.305C98.5 287.055 97.8125 287.633 97.5 287.742C97 287.495 97 287.242 97 287.242ZM88.2969 284H86.5C85.5781 283.698 85.1172 283.078 85 282.5V279.5C85.1172 278.922 85.5781 278.305 86.5 278H88.2969L90.7188 275.57C91.6406 275.43 92 275.888 92 276.102V285.898C91.901 286.276 91.4427 286.63 90.7188 286.43L88.2969 284Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WinBrightnessSunIcon() {
  return (
    <svg width="16" height="16" viewBox="85 329 16 16" fill="none" aria-hidden="true">
      <path
        d="M92.5 330.5V329.5C92.5495 329.049 93.4505 329.049 93.5 329.5V330.5C93.4505 330.951 92.5495 330.951 92.5 330.5ZM87 331.5C87.0495 331.049 87.8516 331.049 88.8516 332.148C88.7526 332.951 88.1484 332.852 87 331.5ZM97 332.5C97.1484 332.148 98.1484 331.148 98.5 331C98.8516 331.852 97.8516 332.852 97 332.5ZM93 333C94.5547 333.312 95.8281 334.172 96.6875 335.445C97 336.448 97 337.552 96.6875 338.562C95.8281 339.836 94.5547 340.688 93 341C91.4375 340.688 90.1641 339.836 89.3125 338.562C89 337.552 89 336.448 89.3203 335.398C90.1953 334.148 91.4688 333.312 93 333ZM85.5 337.5C85.2474 336.549 86.8516 336.648 86.5 337.5H85.5ZM99.5 337.5C99.2474 336.549 100.852 336.648 100.5 337.5H99.5ZM87 342.5C87.2474 341.049 88.8516 341.148 88.5 342.5L87 342.5ZM97 341.5C97.2474 341.049 98.8516 342.148 98.5 342.5L97 341.5ZM92.5 344.5V343.5C92.5495 343.049 93.4505 343.049 93.5 344.5H92.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WinChevronSmallIcon() {
  return (
    <svg width="6" height="10" viewBox="363 172 6 10" fill="none" aria-hidden="true">
      <path d="M363.861 172.611L368.514 176.736C368.625 177 368.514 177.264L364.389 181.389" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function WinSettingsGearIcon() {
  return (
    <svg width="18" height="18" viewBox="387 393 18 18" fill="none" aria-hidden="true">
      <image href="/icons/settings.svg" x="387" y="393" width="18" height="18" preserveAspectRatio="xMidYMid meet" />
    </svg>
  )
}

function WinPencilEditIcon() {
  return (
    <svg width="17" height="17" viewBox="347 393 17 17" fill="none" aria-hidden="true">
      <path
        d="M362.125 397.586L352.141 407.57C351.922 407.727 351.672 407.828 347.805 408.797C347.336 408.672 347.188 408.32 347.203 408.195L348.172 404.328C348.273 404.078 348.43 403.859L358.523 393.766C359.375 393.203 360.383 393 361.391 393.203C362.203 393.75 362.75 394.562 362.945 395.57ZM348.375 407.625L351.43 406.859L360.297 397.992L358.008 395.703L349.141 404.57L348.375 407.625Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WinBatteryStatusIcon() {
  return (
    <svg width="18" height="11" viewBox="85 396 17 11" fill="none" aria-hidden="true">
      <path
        d="M100 402.5H99V403.555C98.7969 404.492 98.2656 405.273 97.4922 405.805C96.5547 406 87.4453 406 86.5078 405.805C85.7266 405.273 85.1953 404.492 85 403.555V398.445C85.1953 397.508 85.7266 396.734 86.5078 396.203C87.4453 396 96.5547 396 97.4922 396.203C98.2656 396.734 98.7969 397.508 99 398.445V399.5H100C100.51 400.24 101 400.5 101 401.5C101 402.5 100.51 402.404 100 402.5ZM98 398.5C98 398.104 97.4193 397.305 96.5 397H87.5C86.5781 397.305 86.1172 397.922 86 398.5V403.5C86.1172 404.078 86.5781 404.698 87.5 405H96.5C97.4193 404.698 97.8828 404.078 98 403.5V398.5ZM95.25 398H87.75V404H95.25V398Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function QuickSettings({ isOpen, onClose, onOpenApp }: QuickSettingsProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Interactive state matching Windows 11 Action Center
  const [wifiOn, setWifiOn] = useState(true)
  const [bluetoothOn, setBluetoothOn] = useState(true)
  const [airplaneOn, setAirplaneOn] = useState(false)
  const [batterySaverOn, setBatterySaverOn] = useState(false)
  const [nightLightOn, setNightLightOn] = useState(true)
  const [accessibilityOn, setAccessibilityOn] = useState(false)
  const [volume, setVolume] = useState(72)
  const [brightness, setBrightness] = useState(85)
  const [showNotification, setShowNotification] = useState(true)

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        !target.closest('.win11-status-cluster') &&
        !target.closest('.win11-clock-btn')
      ) {
        onClose()
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="win11-quicksettings-panel" ref={panelRef} role="dialog" aria-label="Quick Settings & Notifications">
      {/* Optional Notification Toast Card matching Windows 11 */}
      {showNotification && (
        <div className="win11-qs-notification">
          <div className="win11-qs-notif-header">
            <span className="win11-qs-notif-badge">PROXY OS</span>
            <small>Just now</small>
            <button
              className="win11-qs-notif-close"
              onClick={() => setShowNotification(false)}
              aria-label="Tutup notifikasi"
            >
              ✕
            </button>
          </div>
          <strong className="win11-qs-notif-title">12 Anggota Tim Terhubung</strong>
          <p className="win11-qs-notif-desc">
            Portofolio digital kelompok Connect &amp; Deploy (Pekan Ilkomerz 62) siap diakses.
          </p>
        </div>
      )}

      {/* Main 6 Quick Action Buttons (Exact Grid from User SVG) */}
      <div className="win11-qs-grid">
        {/* 1. Wi-Fi */}
        <div className="win11-qs-tile-wrapper">
          <button
            className={`win11-qs-tile ${wifiOn ? 'is-active' : ''}`}
            onClick={() => setWifiOn((prev) => !prev)}
            title="Wi-Fi"
            aria-pressed={wifiOn}
          >
            <WinWifiIcon />
            <WinChevronSmallIcon />
          </button>
          <span className="win11-qs-tile-label">{wifiOn ? 'PROXY-62' : 'Wi-Fi'}</span>
        </div>

        {/* 2. Bluetooth */}
        <div className="win11-qs-tile-wrapper">
          <button
            className={`win11-qs-tile ${bluetoothOn ? 'is-active' : ''}`}
            onClick={() => setBluetoothOn((prev) => !prev)}
            title="Bluetooth"
            aria-pressed={bluetoothOn}
          >
            <WinBluetoothIcon />
            <WinChevronSmallIcon />
          </button>
          <span className="win11-qs-tile-label">Bluetooth</span>
        </div>

        {/* 3. Airplane mode */}
        <div className="win11-qs-tile-wrapper">
          <button
            className={`win11-qs-tile ${airplaneOn ? 'is-active' : ''}`}
            onClick={() => {
              setAirplaneOn((prev) => !prev)
              if (!airplaneOn) {
                setWifiOn(false)
                setBluetoothOn(false)
              }
            }}
            title="Airplane mode"
            aria-pressed={airplaneOn}
          >
            <WinAirplaneIcon />
          </button>
          <span className="win11-qs-tile-label">Airplane mode</span>
        </div>

        {/* 4. Battery saver */}
        <div className="win11-qs-tile-wrapper">
          <button
            className={`win11-qs-tile ${batterySaverOn ? 'is-active' : ''}`}
            onClick={() => setBatterySaverOn((prev) => !prev)}
            title="Battery saver"
            aria-pressed={batterySaverOn}
          >
            <WinBatterySaverIcon />
          </button>
          <span className="win11-qs-tile-label">Battery saver</span>
        </div>

        {/* 5. Night light */}
        <div className="win11-qs-tile-wrapper">
          <button
            className={`win11-qs-tile ${nightLightOn ? 'is-active' : ''}`}
            onClick={() => setNightLightOn((prev) => !prev)}
            title="Night light"
            aria-pressed={nightLightOn}
          >
            <WinNightLightIcon />
          </button>
          <span className="win11-qs-tile-label">Night light</span>
        </div>

        {/* 6. Accessibility */}
        <div className="win11-qs-tile-wrapper">
          <button
            className={`win11-qs-tile ${accessibilityOn ? 'is-active' : ''}`}
            onClick={() => setAccessibilityOn((prev) => !prev)}
            title="Accessibility"
            aria-pressed={accessibilityOn}
          >
            <WinAccessibilityIcon />
          </button>
          <span className="win11-qs-tile-label">Accessibility</span>
        </div>
      </div>

      {/* Sliders Section */}
      <div className="win11-qs-sliders">
        {/* Volume Slider */}
        <div className="win11-qs-slider-row">
          <button
            className="win11-qs-slider-icon"
            onClick={() => setVolume((v) => (v === 0 ? 70 : 0))}
            title={volume === 0 ? 'Unmute' : 'Mute'}
          >
            <WinSpeakerVolumeIcon />
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="win11-qs-range"
            style={{ '--val': `${volume}%` } as React.CSSProperties}
            aria-label="Volume"
          />
          <button className="win11-qs-slider-chevron" title="Pilih perangkat output">
            <WinChevronSmallIcon />
          </button>
        </div>

        {/* Brightness Slider */}
        <div className="win11-qs-slider-row">
          <div className="win11-qs-slider-icon">
            <WinBrightnessSunIcon />
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="win11-qs-range"
            style={{ '--val': `${brightness}%` } as React.CSSProperties}
            aria-label="Kecerahan layar"
          />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="win11-qs-footer">
        <div className="win11-qs-battery-info" title="Baterai: 92% tersisa">
          <WinBatteryStatusIcon />
          <span>92%</span>
        </div>

        <div className="win11-qs-footer-actions">
          <button className="win11-qs-footer-btn" title="Edit quick settings" aria-label="Edit quick settings">
            <WinPencilEditIcon />
          </button>
          <button
            className="win11-qs-footer-btn"
            title="All settings"
            aria-label="All settings"
            onClick={() => {
              onOpenApp('about')
              onClose()
            }}
          >
            <WinSettingsGearIcon />
          </button>
        </div>
      </footer>
    </div>
  )
}
