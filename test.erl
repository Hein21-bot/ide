-module(test).  % Define the module name
-export([execute/0]).  % Export the function 'execute' with 0 arguments

execute() ->  % Define the function 'execute'
    % Step 1: Find OS, OS Version, and Bit Size
    {OS, OSVersion} = os:type(),
    BitSize = erlang:system_info(wordsize) * 8,

    % Step 2: Find out where sandbox.beam is located.
    {ok, CurrentDir} = file:get_cwd(),
    SandboxBeamPath = filename:join([CurrentDir, "test.beam"]),
    FileExists = filelib:is_file(SandboxBeamPath),

    % Step 3: Reconstruct appropriate name for controller-?.js with appropriate value for ?
    FileName = "controller.js",
    ControllerPath = filename:join([CurrentDir, FileName]),

    % Step 4: Execute the appropriate controller-?.js with appropriate value for ?
    case FileExists of
        true -> os:cmd("node " ++ FileName);
        false -> io:format("Error: sandbox.beam does not exist.~n")
    end.
