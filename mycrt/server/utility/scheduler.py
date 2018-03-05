import sched, time
from datetime import datetime, timedelta
import multiprocessing 

from .capture import *

"""
Each capture is created as a process.
Scheduled captures also have a scheduler to run them at their specified start time.

capture_processes holds all of the capture processes
Key: capture_name
Value: (scheduler object, 
        start_process_id, 
        end_process_id,
        start_process_schedule_id, 
        end_process_schedule_id)
"""
capture_processes = {}


# this handles initiating the capture, creating the process for a schedulerd
# assumes if no end time specified, capture is interactive 
def new_capture_process(credentials, capture_name, db_name, start_time, end_time): 

    print('BLAHHHHHHHH', file=sys.stderr)
    capture_scheduler = None
    start_capture_schedule_id = None
    end_capture_schedule_id = None
    end_capture_process = None

    start_capture_process = multiprocessing.Process(target=start_capture, 
            args=(capture_name, db_name, start_time))

    if end_time == 'No end time..': #interactive capture
        start_capture_process.start()
        if start_capture_process.is_alive():
            print('new interactive capture started: ' + capture_name, file=sys.stderr)

    else: #scheduled capture
        print('AAAAAAAAAAA', file=sys.stderr)
        capture_scheduler = sched.scheduler(time.time, time.sleep)

        #schedule start_capture event
        start_time_in_seconds = get_delta(start_time)
        print(start_time_in_seconds, file=sys.stderr)
        print('now: ' + str(time.time()), file=sys.stderr)
        start_priority = 1
        
        start_capture_schedule_id = capture_scheduler.enterabs(start_time_in_seconds, 
                                    start_priority, start_capture_process.start)

        #schedule end_capture event
        print('BBBBBBBB', file=sys.stderr)
        end_capture_process = multiprocessing.Process(target=end_capture, 
                args=(credentials, capture_name, db_name))

        end_time_in_seconds= get_delta(end_time)
        end_priority = 1

        end_capture_schedule_id = capture_scheduler.enterabs(end_time_in_seconds,
                end_priority, end_capture_process.start)

        #run the task at the given times
        """
        there may be some sort of delay depending on processing time 
        for process configurations
        """
        print('CCCCCCCCC', file=sys.stderr)
        schedule_process = multiprocessing.Process(target=capture_scheduler.run) 
        schedule_process.start()
        print('DDDDDDDD', file=sys.stderr)

    capture_processes[capture_name] = (capture_scheduler,
                                        start_capture_process, 
                                        end_capture_process,
                                        start_capture_schedule_id,
                                        end_capture_schedule_id)
    
    print('FOOOOOOOO', file=sys.stderr)


#currently unused, useful later on
def cancel_capture_process(capture_name): 
    #TODO check if the capture was scheduled
    capture_module = capture_processes[capture_name]
    scheduler = capture_module[0]

    #cancel start_capture
    start_capture_process = capture_module[1]
    start_capture_schedule_id = capture_module[3]

    try: 
        scheduler.cancel(start_capture_schedule_id)
    except ValueError: 
        #log: start has already started running
        pass

    if start_capture_process.is_alive():
        start_capture_process.terminate()


    #cancel end_capture
    end_capture_process = capture_module[2]
    end_capture_schedule_id = capture_module[4]
    try: 
        scheduler.cancel(end_capture_process_id)
    except ValueError: 
        #log: event has already started; terminate should take care of it
        pass
    if end_capture_process.is_alive():
        end_capture_process.terminate()
        #TODO handle other interrupt stuff


    #delete dictionary entry
    del capture_processes[capture_name]
    
#convert datetime string to seconds since epoch for use by scheduler
#example input: '2018-03-01 00:09'
#example output: '1519891740.0'
def get_delta(raw_time): 
    dt_obj = datetime.strptime(raw_time, '%Y-%m-%dT%H:%M:%S.%fZ')
    eight_hours = timedelta(hours=8).total_seconds()
    return time.mktime(dt_obj.timetuple()) - eight_hours

