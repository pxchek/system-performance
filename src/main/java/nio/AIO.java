import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

public class AIO {
    public static void main(String[] args) {
        final List<URI> uris = Stream.of(
                "https://www.timesofindia.com",
                "https://www.google.com/",
                "https://www.github.com/"
        ).map(URI::create).collect(toList());

        HttpClient httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .followRedirects(HttpClient.Redirect.ALWAYS)
                .build();

        CompletableFuture[] futures = uris.stream()
                .map(uri -> verifyUri(httpClient, uri))
                .toArray(CompletableFuture[]::new);
        CompletableFuture.allOf(futures).join();
    }

    /**
     * ASYNCHRONOUS NON-BLOCKING I/O (AIO) - AIO is similar to epoll in that the OS is instructed to observe and manage to
     * return indication which streams are ready but the major difference is that after poll or epoll informs the user
     * that the resource is ready, the user must then read or write the resource.AIO handles differently in that it informs
     * the user that IO is complete which infers the data or operation has already been complete or read into user's memory.
     */
    private static CompletableFuture<Void> verifyUri(HttpClient httpClient, URI uri) {
        HttpRequest request = HttpRequest.newBuilder()
                .timeout(Duration.ofSeconds(5))
                .uri(uri)
                .build();
        return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::statusCode)
                .thenApply(statusCode -> statusCode == 200)
                .thenAccept(valid -> System.out.println("Result for " + uri + ": " + valid));
    }
}
