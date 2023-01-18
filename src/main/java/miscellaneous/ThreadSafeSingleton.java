package miscellaneous;

import javax.annotation.concurrent.ThreadSafe;

@ThreadSafe
public class ThreadSafeSingleton {
    private static class ResourceHolder {
        public static Resource resource = new Resource();
    }

    private static Resource get() {
        return ResourceHolder.resource;
    }
}

class Resource {

}

