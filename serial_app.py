import serial
import time
from enum import Enum
import threading
class config(Enum):
    WRITE = "write"
    READ = "read"
    LORA_SET_READ = "AT+TEST=RXLRPKT"
    LORA_SET_WRITE = lambda val :"AT+TEST=TXLRSTR, " + val
# AT+TEST=TXLRSTR, 1234
class grove_lora:
    def __init__(self):
        self.port = "COM6"
        self.baudrate = 9600
        self.ser = serial.Serial(port=self.port, baudrate=self.baudrate)

        self.queue_in = ["AT", "AT+MODE=TEST"]
        self.queue_out = []
        self.mode = None
    def write(self):
        if self.queue_in:
            self.ser.write(self.queue_in.pop(0).encode())
            time.sleep(1)

    def read(self):
        if info := self.ser.readline():
            self.read_rx(info.decode())

            if self.queue_out:
                print(self.queue_out.pop(0))

    def command(self, cmd):
        #self.queue_in.append("AT+TEST=RXLRPKT")
        self.queue_in.append(input())

    def read_rx(self, data):
        if "RX" not in data:
            return
        data = data.split(" ")[-1][1:-3]
        if len(data)%2 != 0:
            return

        out = ""
        for i in range(0, len(data), 2):
            out += chr(int(data[i:i+2], 16))

        self.queue_out.append(out)

    def loop_read(self):
        while 1:
            self.read()
    def loop_write(self):
        while 1:
            self.write()
    def loop_cmd(self):
        while 1:
            self.command(input())

lora = grove_lora()
thread_write = threading.Thread(target=lora.loop_write)
thread_read = threading.Thread(target=lora.loop_read)
thread_cmd = threading.Thread(target=lora.loop_cmd)

thread_write.start()
#thread_read.start()
thread_cmd.start()
"""
        # 31 32 33 34 41 54
        # 38 37 41 54
        # 6F6B4154
"""

