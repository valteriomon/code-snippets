import re
import sys
import requests
import json
import subprocess
import os
from multiprocessing import Process
import time
import watchdog.events
import watchdog.observers
# mport Observer
# from watchdog.events import FileSystemEventHandler

lic = None
master = None
pssh = None
episode = None

def get_key(pssh, lic):
    url = "https://cdrm-project.com/wv"
    data = {
        "license": lic,
        "headers": "accept: \"*/*\"\ncontent-length: \"316\"\nConnection: keep-alive",
        "pssh": pssh,
        "buildInfo": "",
        "proxy": "",
        "cache": False
    }

    response = requests.post(url, data=json.dumps(data))
    html_content = response.text

    start_tag = "<li style=\"font-family:'Courier'\">"
    end_tag = "</li>"
    start_index = html_content.find(start_tag)
    end_index = html_content.find(end_tag, start_index)

    return html_content[start_index + len(start_tag):end_index]

def get_pssh(content):
    pattern = r'URI="data:text/plain;base64,([^"]*)"'
    match = re.search(pattern, content)
    if match:
        return match.group(1)
    else:
        return None

def read_dir(directory, episode):
    global lic, master, pssh
    # for filename in os.listdir(directory):
            # elif filename.endswith('.m3u8') or filename.endswith('.txt'):
    file_path = os.path.join(directory, episode)
    with open(file_path + " - license.txt", 'r') as file:
        content = file.read()
        lic = content

    with open(file_path + " - master.txt", 'r') as file:
        content = file.read()
        master = content

    with open(file_path + " - pssh.m3u8", 'r') as file:
        content = file.read()
        pssh = get_pssh(content)

        # file_path = os.path.join(directory, filename)
        # with open(file_path, 'r') as file:
        #     content = file.read()
        #     if filename.endswith('pssh.m3u8'):
        #         pssh = get_pssh(content)
        #     elif filename.endswith('master.txt'):
        #         master = content
        #     elif filename.endswith('txt'):
        #         lic = content

def remove_files(directory, episode):
    for filename in os.listdir(directory):
        if filename.startswith(episode) and (filename.endswith('.m3u8') or filename.endswith('.txt') or filename.endswith('.json')):
            file_path = os.path.join(directory, filename)
            os.remove(file_path)
            print(f"Removed file: {file_path}")

def main():
    # global episode
    directory_path = "."
    for filename in os.listdir(directory_path):
        if filename.endswith('.json'):
            episode = filename.replace(".json", "")
            print(episode)
            read_dir(directory_path, episode)
            key = get_key(pssh, lic)
            subprocess.call(['D:\\Apps\\N_m3u8DL-RE\\N_m3u8DL-RE.exe', '--auto-select', "--key", key, master, '-M', '--format=mp4', '-mt', '--save-name', episode])
            subprocess.call(['C:\\Program Files\\Subtitle Edit\\SubtitleEdit.exe', '/convert', filename, 'srt'])
            remove_files(directory_path, episode)
            subprocess.call(["powershell", "-c", "(New-Object Media.SoundPlayer 'C:\Windows\Media\chimes.wav').PlaySync()"])

main()
# class Watcher:
#     # Set the directory on watch
#     watchDirectory = "."

#     def __init__(self):
#         self.observer = watchdog.observers.Observer()


#     def run(self):
#         event_handler = Handler()
#         self.observer.schedule(event_handler, self.watchDirectory, recursive = True)
#         self.observer.start()
#         try:
#             while True:
#                 time.sleep(5)
#         except:
#             self.observer.stop()
#             print("Observer Stopped")

#         self.observer.join()


# class Handler(watchdog.events.PatternMatchingEventHandler):
#     def __init__(self):
#         watchdog.events.PatternMatchingEventHandler.__init__(self, patterns=['*license.txt'],
#                                                              ignore_directories=True, case_sensitive=False)

#     @staticmethod
#     def on_created(event):
#         if event.is_directory:
#             return None
#         else:
#             main()

        # elif event.event_type == 'created':
        #     # Event is created, you can process it now
        #     print("Watchdog received created event - % s." % event.src_path)
        # elif event.event_type == 'modified':
        #     # Event is modified, you can process it now
        #     print("Watchdog received modified event - % s." % event.src_path)

# if __name__ == '__main__':
#     watch = Watcher()
#     watch.run()



# class NewFileHandler(FileSystemEventHandler):
#     def __init__(self):
#         # Set the patterns for PatternMatchingEventHandler
#         watchdog.events.PatternMatchingEventHandler.__init__(self, patterns=['*.csv'],
#                                                              ignore_directories=True, case_sensitive=False)
#     def on_created(self, event):
#         if not event.is_directory and event.src_path.endswith('- license.txt'):
#             print(f"New license file created: {event.src_path}")
#             time.sleep(1)
#             main()

# if __name__ == "__main__":
#     arg = False
#     if len(sys.argv) > 1:
#         arg = sys.argv[1]
#     # else:
#     if arg == "--m":
#         directory_path = '.'  # Current directory
#         event_handler = NewFileHandler()
#         observer = Observer()
#         observer.schedule(event_handler, directory_path, recursive=False)
#         observer.start()
#         try:
#             while True:
#                 time.sleep(1)
#         except KeyboardInterrupt:
#             observer.stop()
#         observer.join()
#     else:
#         main()
