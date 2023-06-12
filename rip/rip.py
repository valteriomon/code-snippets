import re
import sys
import requests
import json
import subprocess
import os
from multiprocessing import Process

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

def remove_files(directory, episode):
    for filename in os.listdir(directory):
        if filename.startswith(episode) and (filename.endswith('.m3u8') or filename.endswith('.txt') or filename.endswith('.json')):
            file_path = os.path.join(directory, filename)
            os.remove(file_path)
            print(f"Removed file: {file_path}")

def main():
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