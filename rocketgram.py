import signal
import sys
import urllib.parse
 
import dbus
import requests
from dbus.mainloop.glib import DBusGMainLoop
from gi.repository import GLib
 
# Telegram bot: https://medium.com/codex/using-python-to-send-telegram-messages-in-3-simple-steps-419a8b5e5e2
from config import TEL_TOKEN, CHAT_ID
 
blacklist = []
 
# Catch keyboard interrupt event and give a prettier output.
def sigint_handler(signal, frame):
    print("\nKeyboardInterrupt caught, exiting Rocketgram.")
    sys.exit(0)
 
 
signal.signal(signal.SIGINT, sigint_handler)
 
 
class Notifier:
    def __init__(self):
        self.notifications_history = set()
        self.TOKEN = TEL_TOKEN
        self.chat_id = CHAT_ID
 
    def print_notification(self, bus, message):
        keys = [
            "app_name",
            "replaces_id",
            "app_icon",
            "summary",
            "body",
            "actions",
            "hints",
            "expire_timeout",
        ]
        args = message.get_args_list()
 
        if len(args) == 8:
            notification = dict([(keys[i], args[i]) for i in range(8)])
 
            body = str(notification["body"])
            summary = str(notification["summary"])
            rocket_chat = "rocketchat.*.*"
            app_name = str(notification["app_name"])
 
            if app_name not in blacklist:
                cleaned_body = body.replace(rocket_chat, "").strip()
                notification_tuple = (summary, cleaned_body)
                msg = urllib.parse.quote_plus(f"{summary}: {cleaned_body}")
 
                if notification_tuple not in self.notifications_history:
                    self.notifications_history.add(notification_tuple)
                    try:
                        requests.get(
                            f"https://api.telegram.org/bot{self.TOKEN}/sendMessage?chat_id={self.chat_id}&text={msg}"
                        )
                    except Exception as e:
                        print(e.message, e.args)
                print(f"{app_name} notification sended to telegram.")
 
 
notifier = Notifier()
loop = DBusGMainLoop(set_as_default=True)
session_bus = dbus.SessionBus()
session_bus.add_match_string(
    "type='method_call',interface='org.freedesktop.Notifications',member='Notify',eavesdrop=true"
)
session_bus.add_message_filter(notifier.print_notification)
 
print("Rocketgram is running.")
 
GLib.MainLoop().run()
