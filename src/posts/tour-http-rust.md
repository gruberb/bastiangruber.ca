---
title: Tour of a HTTP request in Rust
description: What happens when you start a web server written in Rust. How can a HTTP request be accepted under the hood?
permalink: posts/{{ title | slug }}/index.html
date: '2024-06-16'
tags: [rust]
---


<div class="info">
This article is part of a chapter of <a href="https://www.manning.com/books/rust-web-development" target="_blank">Rust Web Development</a> which didn't make the cut to be in the book.
</div>

---
<h4>TL;DR</h4>
<img src="https://github.com/gruberb/bastiangruber.ca/blob/main/src/images/tldr-rust.png" />

---

When we talk about a web service, we, more often than not, mean deployed code which listens on a certain IP address and port and responds to HTTP messages. There are many steps involved for two parties to be able to communicate with each other. Application developers are mainly confronted with two pieces of this process: TCP and HTTP.

TCP is a protocol which two parties use to establish a connection. They follow a certain pattern (three-way-handshake) where they send and receive short messages to negotiate the connection details. After establishing this connection, you can receive and send HTTP messages to the other party. HTTP is a stateless protocol which demands a response for every request, and defines, besides other options, the size and format of the data it is sending.

There is a great advantage in knowing how exactly the communication with TCP works and how and where HTTP is added. Having this information can help you improve the performance of your server application and make it more secure. If, for some reason, you want to choose any other protocol than TCP or HTTP, you know where and how to replace it.

<div class="sidecar">
<h5>TCP vs. UDP</h5>

<p>TCP is a connection-oriented protocol which starts creating a connection via a so-called three-way-handshake. It makes sure to send packets in the right order and tries to resend them if they failed to arrive at the other side. TCP headers are therefore larger (20 bytes) and the whole process slower than if you would use UDP.</p>

<p>UDP packet headers are smaller (8 bytes) and there is no formal connection creation included in the protocol. The order of the packets is not secured and if one message fails to arrive, there is no built-in retry.
</p>
<p>You would use UDP for application like stock quotes or streaming services, gaming servers or weather applications. You can resend data more often, and if you want to implement your own retry mechanism. Also, data is getting outdated faster and you might not care about every single packet arrive in the same order or at all. UDP can also be broadcasted to several hosts whereas TCP is always a single client-server connection.
</p>
<p>You use TCP when you want a reliable data transfer. For example, banking applications or in e-commerce, where you don’t want to lose sensitive information along the way or have to communicate the state between client and server.
</p>
</div>

## Rust and the OSI model

Web services are deployed on computers connected to the internet. These computers have IP addresses and open ports they listen to for new messages. Applications running on these machines are signaling interest on certain messages so they can process and answer these.

<div class="sidecar">
<h5>OSI model</h5>
<p>The Open Systems Interconnection (OSI) model is a helpful tool to abstract the underlying technology involved in transmitting bytes from A to B away. Bytes sent from a server to a client go through the computer itself, over to different routers and the physical wire connecting to larger endpoints.</p>

<p>The OSI model helps to visualize the stages involved in sending the bytes, and groups the parts involved in the process in different layers. The layers described in the model are Physical (1), Data link (2), Network (3), Transport (4), Session (5), Presentation (6), Application (7).
</p>
</div>

A message sent to a server has to go through multiple layers and geographically different locations for it to arrive. To get a better understanding of these different layers, the OSI model was created. It is a conceptual framework to standardize the communications.

As we can see in the following figure, a client can’t just send over data to a server. It needs to go through many different routers to find the right server. For it not to get lost, a user application and the kernel are adding several headers to it, so each layer of the communication process knows where to route it to.

<img src="https://recv.online/share/osi.png" />

A packet goes through these different layers, and almost all of them add an extra header on top so the next layer knows how to deal with the information. Your application adds a HTTP header on top of the data it wants to send, before the kernel adds the TCP, IP and Ethernet header.

The receiving server goes through the same process but in reverse. It has to dismantle each header until it can read the data inside of it.

<img src="https://recv.online/share/layers.png" />

The added header sizes are standardized, so the operating system and the kernel know how many bytes they have to strip out until they can read the data. We can use this information now to get a better grasp on our data we receive.

In the OSI overview figure earlier, we see that the ethernet and IP header are pretty non-negotiable. But everything else is more in our control. We can choose UDP for example instead of TCP and can use our own protocol instead of using HTTP. We can, for example, have security reasons to implement our own protocol (with an own header size), so intruders who are reading our messages can’t make sense of them.

Where does Rust come into play? A web service has to support the following mechanism for it to be able to create connection, receiving messages and sending responses:

* Opening a connection to another client
* Support the different layers (TCP and HTTP)
* Hold connections
* Parse receiving messages
* Send proper HTTP messages back

Many other programming languages include a rich standard library to create these HTTP servers. Rust is however a little bit different. Being a Systems Programming Language, Rust wants to be as small as possible and also functioning well on micro controllers for example who don’t always want to communicate via HTTP with their peers.

Therefore, Rust decided just to include a basic understanding of TCP in the standard library, and no build-in support for HTTP. The blue parts (TCP/IP) are included in the Rust standard library. If you want to create web server which supports HTTP, you have to create your own. Luckily, this is a common scenario, so the community already built some battle-tested web server implementations in the past. The crate hyper for example is widely used as a http server.

<div class="sidecar">
<h5>Rust crates</h5>
<p>External libraries or packages are called “crates” in Rust. They are hosted on a website called crates.io and will be retrieved once a Rust project compiles. You can add crates to a Rust project in the Cargo.toml file, and after using the cargo build or cargo run command on the terminal, the newly added crates will be downloaded and added to your local project.</p>
</div>

There are also crates for web frameworks, which include all the layers beneath them (HTTP, TCP etc.) and offer all the modern ergonomics like parsing URL query parameter, reading and returning JSON and so on.

<img src="https://recv.online/share/crates.png" />

This also gives you a greater choice: If you just want a minimal functioning application server without much bloat doing one thing, you can create the few functions you need by hand and have a lightweight solution afterwards.

If you are coming from Go, NodeJS or Java, this means a shift in perspective. You probably have to look for a library which supports your needs from the start instead of going a few more miles without thinking about help from the community.

In addition to HTTP, you also need to make sure the connection between client and server is secure. This is handled via TLS (Transport Layer Security), a successor of SSL. Rust also hasn’t built-in TLS support, but there exist a few packages which support you in enabling TLS in your application.


### Opening a connection

We look at an example where a browser application is sending a HTTP request to our web service which is written in Rust. We will dive shortly into how exactly the bytes arrive at the kernel, and how our Rust application is getting the bytes delivered into the running application. Note that this is all abstracted away through libraries, but you can later on choose not to use such library and implement something via the Rust core library itself.

In addition, it is helpful to know or at least heart about it once how exactly the flow of bytes in a web service works, so you can spot bugs, bottlenecks and other misconfigurations later on in your running application.

When the client sends a HTTP request, the kernel is wrapping the data in a package with a HTTP and TCP header attached to it. It arrives on our server at the so called NIC (network interface card). The client first has to establish a TCP connection to our server. Once done, our kernel opened a socket to which is listening to this address for incoming messages.

If you want to dig deeper into the kernel side of networking, I highly recommend <a href="https://beej.us/guide/bgnet/html/" target="_blank">Beej's Guide to Network Programming</a>.

<img src="https://recv.online/share/kernel.png" />

When we run a web server in Rust, we also have a socket to the operating system side where we can listen to incoming messages. The kernel’s job is to copy the data from the incoming TCP message onto our internal socket and notifies us when new data arrived.

In detail, the kernel reads the incoming messages and figures out which TCP connection (IP address and port) it is associated with, looks up the corresponding socket and copies the data to a receive buffer.

It notifies the process which is listening to new data to this socket and copies the data to a new buffer once the process is signaling interest. It copies the data from the receive buffer into the read buffer so that your server application can get the bytes out of the kernel into your program.

<div class="sidecar">
<h5>Forming full messages out of a stream</h5>
<p>When a client and server connect via TCP, they send data over a physical wire in a so-called stream. This data has no clear beginning and end. Once the connection is open, you send data and the kernel decides when the buffer is full and sends data out to the client and vice-versa. To be able to tell when “a full” message arrived, we need a protocol on top of TCP to tell us about the beginning, the structure and end of a message and conversation. In most cases, this protocol is HTTP.</p>
</div>

We learned earlier that Rust supports TCP right out of the box. Therefore, we can create, open and listen to a TCP socket within Rust. Once we receive a message, we can also answer back on the same socket. We can basically send any text back to the socket, we just have to be aware that the other side can interpret what we are sending.

Let’s open a socket, so the kernel knows where to forward incoming requests to. Each socket has to know the protocol being used (TCP in our case), the IP address and the port. In Rust, the TcpListener is handling the job for us, and we can use bind to tell the kernel the address and port we are listening to.

```rust
use std::net::TcpListener;

fn main() {
	let listener = TcpListener::bind("127.0.0.1:8080").unwrap();
	for stream in listener.incoming() {
            let stream = stream.unwrap();
            println!("stream accepted {:?}", stream);
}
```

If you use `cargo run` to start the server, open a browser and navigate to `localhost:8080`, you see that we print something like this:

```bash
stream accepted TcpStream { addr: 127.0.0.1:8080, peer: 127.0.0.1:56931, fd: 4 }
```

This is a step in the right direction. But why don’t we see any data or HTTP headers? It’s because we receive a stream and print it on the console. We actually have to read the content from the stream.

<div class="sidecar">
<h5>Possible failure when starting a server</h5>
<p>Connecting to a port and establishing a connection can fail for many reasons. Therefore both the TcpListener and the stream of the type TcpStream will return a Result<T,E>. In our example we assume everything works correctly, but in a production environment, the port you are choosing can already be busy listening to another application. Once opened, the incoming stream is actually an attempt of a connection, which can fail due to buffer limitations for example. </p>
</div>

When reading from the stream like that, the baseline we expect is UTF8 encoded text. At this point, the kernel already stripped away the TCP header and all we have left is the data encapsulated in it. This can either be HTTP headers + data or some other headers attached to the data.

<img src="https://recv.online/share/message.png" />

We marked the Session layer with an asterisk (*), because technically, the Linux Kernel doesn’t concern itself with the OSI model and implements its own mechanics. However, the idea of keeping a connection is handled in the kernel, and when copying the data over to the socket for the Rust application, the TCP header will be removed.

Parsing our stream content, we should see the headers and also the data in plain text, and it is on us to strip away the headers to get to the real data of the message. Headers however play an important role: They help us interpret the data we receive.

There are plenty of different HTTP header, and the server is in charge to interpret them in the right way and work with them.

When using a web framework later on, all the details are abstracted away. However it is vital to understand the flow how information arrives at your application so later on, you can choose asynchronous strategies, your own protocol and where to look for optimizations.

### Adding HTTP

The `TcpListener` gave us a stream, which we need to read and interpret. We have to somehow take this stream and read what’s in it. For this, we need a few components. First, we need to create a new function which takes an incoming stream and writes the bytes back to a local buffer. From there we can parse the data accordingly and send back an answer.

We add a helper function which does exactly that for us.

```rust
…

fn handle_stream(mut stream: TcpStream) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();
    println!("Request: {}", String::from_utf8_lossy(&buffer[..]));
}
…

```

All we have to do is to call this function in our iterator.

```rust

use std::net::{TcpListener, TcpStream};
use std::io::prelude::*;

…

fn main() {
	let listener = TcpListener::bind("127.0.0.1:8080").unwrap();
	for stream in listener.incoming() {
	    let stream = stream.unwrap();
	    handle_stream(stream);
	}
}
```

After starting the application again with cargo run, you can open a new browser window and navigate to the website `localhost:8080` and see what your application is printing onto the console.

It will vary with your browser of choice, but the current version of Safari will send multiple requests which look like the following:

```bash
GET / HTTP/1.1
Host: localhost:8080
Upgrade-Insecure-Requests: 1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15
Accept-Language: en-us
```

It includes:
* `GET`: The HTTP method
* `/`: The Path on the server
* `HTTP/1.1`: The version of the HTTP protocol
* `HOST`: The host/domain of the server we want to request data from
* `Accept-Language`: Which human language we prefer and understand

<div class="sidecar">
<h5>Development workflow</h5>
<p>You can see based on this simple example that developing web services with Rust has a caveat. You have to stop and recompile your binary before you can test your code again. Since we have a very strict compiler, this can take sometimes longer than with other languages.</p>
<p>However, have in mind that you can install extensions for VIM or your IDE to run a code analyzer while you write it. This will highlight errors before you start an application again with cargo run. Since undefined behavior is almost impossible in Rust, you save countless hours afterwards compared to other languages</p>
</div>

Instead of just printing out the stream, we can start to look at the HTTP specification, store the content in an array and iterate over it line by line, and create a HTTP struct out of it. This work is not trivial since we need to check the length of the message from the HTTP header and build the full message ourselves.

Thankfully there are already crates published in the Rust ecosystem which help you with this task. So, deploying a http server in production is much less work than we do here by hand.

<div class="sidecar">
<h5>Why do we see a full HTTP message?</h5>
<p>We learned that bytes arrive in a stream with no clear beginning or end. The application layer protocol (HTTP) is responsible for structuring our byte stream. Why, however, are we seeing the HTTP request than as a full message with a beginning and end? Shouldn’t messages overlap or have missing information when getting pulled out of the stream?</p>
<p>We are just lucky. Since we have a simple application with just a few requests at once, the kernel buffer is just full enough to empty out and hand over the complete HTTP message. We can’t rely on that however in a production  ready application.</p>
</div>

After you opened your browser and navigated to localhost:8080, you saw an error page. That’s because we don’t return an answer yet, which the HTTP protocol requests we do. To solve this problem, we can write onto the stream and send bytes back to the client.

```rust
...

fn handle_stream(mut stream: TcpStream) {
    let mut buffer = [0; 512];
    stream.read(&mut buffer).unwrap();
    println!("{}", String::from_utf8_lossy(&buffer[..]));

    let response = "HTTP/1.1 200 OK\r\n\r\n";
    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}

...

```

When you open your browser now and navigate to localhost:8080, you will get a blank page instead of an error. We successfully communicated via HTTP to another application in just a few lines of code.

---

<div class="info">
This article is part of a chapter of <a href="https://www.manning.com/books/rust-web-development" target="_blank">Rust Web Development</a> which didn't make the cut to be in the book.
</div>
