from colorama import Fore,Back,Style
import platform,os

OsName = platform.uname()[0]

def banner():
    if OsName == "Windows":
      os.system("cls")
    else:
      os.system("clear")
    print(Fore.LIGHTWHITE_EX+"       ()        )        ()   *     -      (              ")   
    print(Fore.LIGHTWHITE_EX+"     )(\/))     ) (     (   )\ )   ( _`() (   )\ )           ")  
    print(Fore.LIGHTWHITE_EX+"    (()\/())  /( )\(   )) (()/(   )\))( ( )\ (()/( (        " )
    print(Fore.LIGHTWHITE_EX+"    (_))( )(_))((_)\   /(_)_)()\  (_)_)((_) /(_)))\       ")
    print(Fore.CYAN+"   _    __  __ _____   __   _   _      _     _    _                    "  )
    print(Fore.CYAN+"  /_\   \ \/ / | ---|  | |/ /   \ \  / /    | |  | |" )
    print(Fore.CYAN+" / _ \   | |   | ---   |   \     \ \/ /  _  | |  | |" )
    print(Fore.CYAN+"/_/ \_\  |_|   |____|  |_|\_\     \ /   |_| |_|  |_|" )
    print(Fore.CYAN+"                                                              "  )
    print(Fore.LIGHTWHITE_EX+"   (_))( )(_))((_)\(_)   (_)/(_)_  )()\  )((_) /(_)))\       ")
    print(Fore.LIGHTWHITE_EX+"    )()\/())  /(  )\ ())  (()/(  ) \))(  ( )\ (()/( (        " )
    print(Fore.LIGHTWHITE_EX+"     ((\/))    ) ( / (    )\ )  (   `      (   )\ )           ")
    print(Fore.LIGHTWHITE_EX+"       )(       )         )(        *          (              ")
    print(Style.RESET_ALL)

banner()