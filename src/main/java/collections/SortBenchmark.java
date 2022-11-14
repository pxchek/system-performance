package collections;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.BenchmarkMode;
import org.openjdk.jmh.annotations.Fork;
import org.openjdk.jmh.annotations.Measurement;
import org.openjdk.jmh.annotations.Mode;
import org.openjdk.jmh.annotations.OutputTimeUnit;
import org.openjdk.jmh.annotations.Scope;
import org.openjdk.jmh.annotations.State;
import org.openjdk.jmh.annotations.Warmup;
import org.openjdk.jmh.profile.GCProfiler;
import org.openjdk.jmh.profile.StackProfiler;
import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.RunnerException;
import org.openjdk.jmh.runner.options.Options;
import org.openjdk.jmh.runner.options.OptionsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@State(Scope.Benchmark)
@BenchmarkMode(Mode.Throughput)
@Warmup(iterations = 1, time = 1)
@Measurement(iterations = 1, time = 1)
@OutputTimeUnit(TimeUnit.SECONDS)
@Fork(1)
public class SortBenchmark {
    @Benchmark
    public List<String> properlySizedArrayList() {
        List<String> list = new ArrayList<>(1_000_000);
        for (int i = 0; i < 1_000_000; i++) {
            list.add(String.valueOf(0));
        }
        return list;
    }

    @Benchmark
    public List<String> resizingArrayList() {
        List<String> list = new ArrayList<>(1_000_000);
        for (int i = 0; i < 1_000_000; i++) {
            list.add(String.valueOf(0));
        }
        return list;
    }

    public static void main(String[] args) throws RunnerException {
        Options opt = new OptionsBuilder()
                .include(SortBenchmark.class.getSimpleName())
                .warmupIterations(5)
                .measurementIterations(1)
                .forks(1)
                .jvmArgs("-server", "-Xms2048m", "-Xmx2048m")
                .addProfiler(GCProfiler.class)
                .addProfiler(StackProfiler.class)
                .build();

        new Runner(opt).run();
    }
}
